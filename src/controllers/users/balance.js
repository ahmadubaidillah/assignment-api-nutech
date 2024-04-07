import Models from '../../db/mysql/models/index.js'
import { catchAsync, response } from '../../utils/helpers.js'

const { Balance, Transaction } = Models

export default {
  getBalance: catchAsync(async (req, res) => {
    const userId = req.userId

    const [balance, created] = await Balance.findOrCreate({
      where: { userId },
      defaults: { userId }
    })

    return res.status(200).json({
      status: 0,
      message: 'Get Balance Berhasil',
      data: {
        balance: balance.balance
      }
    })
  }),

  topUp: catchAsync(async (req, res) => {
    const userId = req.userId
    const { top_up_amount } = req.body

    if (!Number.isInteger(top_up_amount) || top_up_amount <= 0) {
      return res.status(400).json(
        response({
          status: 102,
          message:
            'Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0'
        })
      )
    }

    const [balance, created] = await Balance.findOrCreate({
      where: { userId },
      defaults: { userId }
    })

    const total = balance.balance + top_up_amount

    await balance.update({ balance: total })
    await balance.reload()

    const data = { balance: balance.balance }

    await Transaction.create({
      userId: userId,
      transactionType: 'TOPUP',
      totalAmount: top_up_amount,
      description: 'Top Up balance'
    })

    res.status(200).json(
      response({
        status: 0,
        message: 'Top Up Balance berhasil',
        data: data
      })
    )
  })
}
