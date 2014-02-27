module.exports = function(sequelize, DataTypes) {
  var Feedback = sequelize.define('Feedback', {
    session_id: DataTypes.STRING,
    text: DataTypes.STRING,
    x: DataTypes.INTEGER,
    y: DataTypes.INTEGER
  }, {
  })
 
  return Feedback
}
