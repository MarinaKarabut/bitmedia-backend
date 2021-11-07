const usersStatisticData = require("../../db/users_statistic.json")
const usersData = require("../../db/users.json")

const getAllUsers = async (req, res) => {
  const { id } = req.params

  const userInfo = usersData.find((el) => el.id === Number(id))

  const user = usersStatisticData.filter((el) => el.user_id === Number(id))

  if (!user) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    })
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      user,
      firstName: userInfo.first_name,
      lastName: userInfo.last_name,
    },
  })
}

module.exports = getAllUsers
