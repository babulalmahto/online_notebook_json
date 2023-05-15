const fs = require("fs");
const path = require("path");
const filePath = path.resolve(__dirname, "../database/database.json");

class mainController {
    createUser(req, res) {
        const { firstName, lastName, dateOfBirth, phoneNumber, emailId, password, gender, occupation, country, intrestedIn, language } = req.body;
        fs.readFile(filePath, "utf-8", (err, data) => {
            if (err) return res.status(400).json({
                status: 400,
                message: "somrthing went wrong"
            })

            let userData = JSON.parse(data);

            const ifUserNamePresent = userData.find(elem => elem.emailId === emailId);
            if (ifUserNamePresent) return res.status(409).json({
                status: 409,
                message: "UserName already present"
            });
            userData.push({ firstName, lastName, dateOfBirth, phoneNumber, emailId, password, gender, occupation, country, intrestedIn, language });
            userData = JSON.stringify(userData);
            fs.writeFile(filePath, userData, (err, data) => {
                if (err) return res.status(400).json({
                    status: 400,
                    message: "something went wrong"
                })
                console.log(data);
                res.status(200).json({
                    status: 200,
                    message: "Data created successfully"
                });
            })
        })
    }

    getUser(req, res) {
        fs.readFile(filePath, "utf-8", (err, data) => {
            if (err) return res.status(400).json({
                status: 400,
                message: "something went wrong"
            })
            res.status(200).json({
                status: 200,
                message: "Data fetched successfully",
                Total_Users: JSON.parse(data).length,
                data: JSON.parse(data)
            })
        })
    }

    updateUser(req, res) {
        const { firstName, lastName, dateOfBirth, phoneNumber, emailId, password, gender, occupation, country, intrestedIn, language } = req.body;
        fs.readFile(filePath, "utf-8", (err, data) => {
            if (err) return res.status(400).json({
                status: 400,
                message: "Something went wrong"
            })

            let userData = JSON.parse(data);
            const ifUserNamePresent = userData.find(elem => elem.emailId === emailId);
            if (!ifUserNamePresent) return res.status(400).json({
                status: 400,
                message: "username not present"
            })

            userData = userData.map(user => {
                if (user.emailId === emailId) {
                    if (firstName) user.firstName = firstName;
                    if (lastName) user.lastName = lastName;
                    if (dateOfBirth) user.dateOfBirth = dateOfBirth;
                    if (phoneNumber) user.phoneNumber = phoneNumber;
                    if (password) user.password = password;
                    if (gender) user.gender = gender;
                    if (occupation) user.occupation = occupation;
                    if (country) user.country = country;
                    if (intrestedIn) user.intrestedIn = intrestedIn;
                    if (language) user.language = language;
                }
                return user;
            })
            userData = JSON.stringify(userData);
            fs.writeFile(filePath, userData, (err, data) => {
                if (err) return res.status(400).json({
                    status: 400,
                    message: "Something wenr wrong"
                })
                res.status(200).json({
                    status: 200,
                    message: "Data updated successfully"
                })
            })
        })
    }

    deleteUser(req, res) {
        const emailId = req.body.emailId;
        fs.readFile(filePath, "utf-8", (err, data) => {
            if (err) return res.status(400).json({
                status: 400,
                message: "Something went wrong"
            })

            let userData = JSON.parse(data);
            const ifUserNamePresent = userData.find(elem => elem.emailId === emailId);
            if (!ifUserNamePresent) return res.status(404).json({
                status: 404,
                message: "Username not present"
            })

            userData = userData.filter(elem => elem.emailId !== emailId);
            userData = JSON.stringify(userData);
            fs.writeFile(filePath, userData, (err, data) => {
                if (err) return res.status(400).json({
                    status: 400,
                    message: "Something went wrong"
                })
                res.status(200).json({
                    status: 200,
                    message: "Data deleted successfully"
                })
            })
        })
    }

}
module.exports = new mainController;