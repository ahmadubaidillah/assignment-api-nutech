import Models from '../../db/mysql/models/index.js'
import { catchAsync, response } from '../../utils/helpers.js'

const { Transaction, Balance, Services } = Models

export default {
  transaction: catchAsync(async (req, res) => {
    const userUid = req.userUid
    const { service_code } = req.body

    const service = await Services.findOne({
      where: { serviceCode: service_code }
    })
    if (!service) {
      res.status(400).json(
        response({
          status: 102,
          message: 'Service ataus Layanan tidak ditemukan'
        })
      )
    }

    const [balance, created] = await Balance.findOrCreate({
      where: { userUid },
      defaults: { userUid }
    })

    if (balance.balance < service.serviceTarif) {
      return res.status(400).json(
        response({
          status: 103,
          error: 'Saldo tidak cukup, silahkan top up terlebih dahulu.'
        })
      )
    }

    const total = balance.balance - service.serviceTarif
    await balance.update({ balance: total })

    const transaction = await Transaction.create({
      userUid: userUid,
      transactionType: 'PAYMENT',
      totalAmount: service.serviceTarif,
      description: service.serviceName
    })

    const data = {
      invoice_number: transaction.invoiceNumber,
      service_code: service.serviceCode,
      service_name: service.serviceName,
      transaction_type: transaction.transactionType,
      total_amount: service.serviceTarif,
      created_on: transaction.createdAt
    }

    res
      .status(200)
      .json(response({ status: 0, message: 'Transaksi berhasil', data: data }))
  }),

  getTransaction: catchAsync(async (req, res) => {
    const userUid = req.userUid
    let { limit, offset } = req.query
    limit = parseInt(limit)
    offset = parseInt(offset)

    const transactions = await Transaction.findAll({
      limit: limit,
      offset: offset,
      where: { userUid }
    })

    const records = transactions.map((transaction) => ({
      invoice_number: transaction.invoiceNumber,
      transaction_type: transaction.transactionType,
      description: transaction.description,
      total_amount: transaction.totalAmount,
      created_on: transaction.createdAt
    }))

    const data = {
      limit: limit,
      offset: offset,
      records: records
    }

    res
      .status(200)
      .json(
        response({ status: 0, message: 'Get History Berhasil.', data: data })
      )
  })
}
