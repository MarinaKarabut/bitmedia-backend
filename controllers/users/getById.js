const usersStatisticData = require("../../db/users_statistic.json")
const usersData = require("../../db/users.json")

const getAllUsers = async (req, res) => {
  console.log(req)
  const { id } = req.params
  const { start, end } = req.query

  const userInfo = usersData.find((el) => el.id === Number(id))

  const user = usersStatisticData.filter((el) => el.user_id === Number(id))

  if (!user) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    })
  } else {
    let days = usersStatisticData.filter((el) => el.user_id === Number(id))

    const resDays = () => {
      if (!start && !end) {
        return days.slice(0, 7)
      }
      let startIndex = days.findIndex((el) => el.date === start)
      let endIndex = days.findIndex((el) => el.date === end)
      return days.slice(startIndex, endIndex)
    }

    res.json({
      status: "success",
      code: 200,
      data: {
        firstName: userInfo.first_name,
        lastName: userInfo.last_name,
        days: resDays(),
      },
    })
  }
  // res.json({
  //   status: "success",
  //   code: 200,
  //   data: {
  //     user,
  //     firstName: userInfo.first_name,
  //     lastName: userInfo.last_name,
  //   },
  // })
}

module.exports = getAllUsers
