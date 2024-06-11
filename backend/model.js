function model(Sequelize, connection) {
    var Title = connection.define("title", {
        no:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true,
        },
        title: {
            type:Sequelize.TEXT,
        },
        score: {
            type:Sequelize.INTEGER,
            defaultValue: 0
        },
        writeDate: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    })

    var Content = connection.define("content", {
        no: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titleNo: {
            type:Sequelize.INTEGER
        },
        writer: {
            type: Sequelize.STRING
        },
        content: {
            type:Sequelize.TEXT,
        }
    })

    Title.hasMany(Content, {
        as:"titles",
        foreignKey:"titleNo"
    })

    connection.sync({
        alter: true
    })
}

module.exports = model;