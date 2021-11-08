const usersData = require("../../db/users.json")
const usersStatsData = require("../../db/users_statistic.json")

const getAllUsers = async (req, res) => {
  const { limit, page } = req.query

  const start = Number(limit) * Number(page) - Number(limit)

  const end = Number(start) + Number(limit)

  const selectedUsers = usersData.slice(start, end)

  const userStats = usersStatsData.filter((el) =>
    selectedUsers.some((user) => user.id === el.user_id)
  )

  const users = selectedUsers.map((user) => {
    let newEl = Object.assign({}, user)
    newEl.total_clicks = userStats.reduce((count, stat) => {
      if (stat.user_id === user.id) {
        return count + stat.clicks
      }
      return count
    }, 0)
    newEl.total_page_views = userStats.reduce((count, stat) => {
      if (stat.user_id === user.id) {
        return count + stat.page_views
      }
      return count
    }, 0)
    return newEl
  })

  try {
    return res.json({
      status: "success",
      code: 200,
      data: {
        result: users,
      },
    })
  } catch (error) {
    throw error
  }
}

module.exports = getAllUsers
