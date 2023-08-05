const Admin = require('../models/Admin');

const fs = require('fs');

const path = require('path');

const nodemailer = require('../config/nodemailer');

module.exports.dashboard = function (req, res) {
    return res.render('dashboard');
}

module.exports.AddRecord = function (req, res) {
    return res.render('add_record');
}

module.exports.ViewRecord = function (req, res) {
    Admin.find({}, function (err, record) {
        return res.render('view_record', {
            adminRecord: record
        });
    })
}

module.exports.DeleteAdminRecord = function (req, res) {
    var id = req.params.id;
    Admin.findById(id, function (err, data) {
        if (err) {
            console.log("something is wrong");
            return false;
        }

        fs.unlinkSync(path.join(__dirname, '..', data.avatar));
        Admin.findByIdAndDelete(id, function (err, deleteRecord) {
            if (err) {
                console.log('record not deleted');
                return false;
            }
            return res.redirect('/admin/viewRecord');
        })
    })
}

module.exports.upadateAdminRecord = function (req, res) {
    Admin.findById(req.params.id, function (err, record) {
        if (err) {
            console.log("not upadated record");
            return false;
        }
        return res.render('updateData', {
            'singleRecord': record
        })

    })
}

module.exports.editAdminRecord = function (req, res) {

    Admin.uploadedAvatar(req, res, function (err) {
        if (err) {
            console.log("images is not uploaded");
            return false;
        }
        console.log(req.file);
        console.log(req.body);
        if (req.file) {

            Admin.findById(req.body.admin_id, function (err, data) {
                if (err) {
                    console.log("error");
                    return false;
                }
                // fs.unlinkSync(path.join(__dirname,'..',data.avatar));

                var avatar = Admin.avatarPath + "/" + req.file.filename;
                var name = req.body.fname + " " + req.body.lname;
                Admin.findByIdAndUpdate(req.body.admin_id, {
                    name: name,
                    email: req.body.email,
                    gender: req.body.gender,
                    hobby: req.body.hobby,
                    message: req.body.message,
                    city: req.body.city,
                    avatar: avatar
                }, function (err, record) {
                    if (err) {
                        console.log("record not update");
                        return false;
                    }
                    return res.redirect('/admin/ViewRecord');
                })
            });
        }
        else {
            Admin.findById(req.body.admin_id, function (err, data) {
                var avatar = data.avatar;
                var name = req.body.fname + " " + req.body.lname;
                Admin.findByIdAndUpdate(req.body.admin_id, {
                    name: name,
                    email: req.body.email,
                    gender: req.body.gender,
                    hobby: req.body.hobby,
                    message: req.body.message,
                    city: req.body.city,
                    avatar: avatar
                }, function (err, record) {
                    if (err) {
                        console.log("record not upated");
                        return false;
                    }
                    return res.redirect('/admin/ViewRecord');
                })
            })
        }
    })
}


module.exports.insertAdminRecord = function (req, res) {

    Admin.uploadedAvatar(req, res, function (err) {
        if (err) {
            console.log("image not upload");
            return false;
        }
        var name = req.body.fname + " " + req.body.lname;
        if (req.file) {
            var avatar = Admin.avatarPath + "/" + req.file.filename;
            Admin.create({
                name: name,
                email: req.body.email,
                password: req.body.password,
                gender: req.body.gender,
                hobby: req.body.hobby,
                city: req.body.city,
                message: req.body.message,
                avatar: avatar
            }, function (err, record) {
                if (err) {
                    console.log("record not inserted");
                    return false;
                }
                return res.redirect('back');
            })

        }
    })

}

module.exports.login = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/admin/dashboard');
    }
    return res.render('login', { layout: 'login' });
}

module.exports.chockLogin = function (req, res) {

    // console.log(req.body);
    return res.redirect('/admin/dashboard');
}

module.exports.changepassword = function (req, res) {
    return res.render('changepassword');
}

module.exports.confirmChangePass = function (req, res) {

    // console.log(req.user.password);
    // var currentPass = req.user.password;
    var currentPass = req.user.password;
    // console.log( req.user./password );

    var current = req.body.current;
    var newPass = req.body.npassword;
    var conPass = req.body.cpassword;
    if (current == currentPass) {
        if (current != newPass) {
            if (conPass == newPass) {
                var admin_id = req.user.id;
                Admin.findByIdAndUpdate(admin_id, {
                    password: newPass
                }, function (err, record) {
                    if (err) {
                        console.log("password not changed");
                        return false;
                    }

                    return res.redirect('/admin/logout');

                })
            }
            else {
                return res.redirect('back');
            }
        }
        else {
            return res.redirect('back');
        }
    }
    else {
        return res.redirect('back');
    }



}

module.exports.logout = function (req, res) {
    req.logout(function (err) {
        if (err) {
            console.log("something wrong");
            return false;
        }
        return res.redirect('/admin/');
    });
}

module.exports.lostpassword = function (req, res) {
    return res.render('lostpassword', { layout: 'lostpassword' });
}

module.exports.ForgotPassword = function (req, res) {
    Admin.findOne({ email: req.body.email }, function (err, adminRecord) {
        if (err) {
            req.flash("error", 'email not found');
            return res.redirect('back');
        }
        if (adminRecord) {
            var otp = Math.random();
            otp = parseInt(otp * 100000);
            console.log(otp);
            res.cookie('otp', otp);
            res.cookie('email', req.body.email);

            nodemailer.transporter.sendMail({
                from: "sagarzinzala9@gmail.com",
                to: req.body.email,
                subject: "OTP Checking",
                html: "<h1>Your Otp is:" + otp + "</h1>"
            }, function (err, info) {
                if (err) {
                    console.log("email is not sent");
                    return false;
                }
                console.log("message send", info);
                return res.redirect('/admin/check_otp');
            })

        }
        else {
            req.flash("error", 'email not found');
            return res.redirect('back');
        }

    })
}

module.exports.checkOTP = function (req, res) {
    console.log(req.cookies.otp);
    return res.render('checkOTP', { layout: 'checkOTP' });
}

module.exports.checkOTPData = function (req, res) {

    console.log(req.body);
    console.log(req.cookies.otp);
    if (req.cookies.otp === req.body.form_otp) {
        return res.redirect('/admin/confirmPassword');
    }
    else {
        console.log("otp is not matched");
        return res.redirect('back');
    }
}

module.exports.confirmPassword = function (req, res) {
    res.render('confirmPassword', { layout: 'confirmPassword' });
}

module.exports.confirmPassData = function (req, res) {
    if (req.body.npass == req.body.cpass) {
        var email = req.cookies.email;
        Admin.findOne({ email: email }, function (err, record) {
            Admin.findOneAndUpdate(record.id, {
                password: req.body.npass
            }, function (err, data) {
                if (err) {
                    console.log("password update failed");
                    return false;
                }
                return res.redirect('/admin');
            })
        })
    }
    else {
        console.log('confirmPass failed');
        return res.redirect('back');
    }
}
