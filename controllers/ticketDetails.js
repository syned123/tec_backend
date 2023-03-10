const { response } = require("express");
const TicketDetails = require("../models/TicketDetails");
const getTicketDetail = async (req, res = response) => {
  const ticketDetail = await TicketDetails.find();
  return res.json({
    ok: true,
    ticketDetail,
  });
};
const postTicketDetail = async (req, res = response) => {
  const ticketDetail = new TicketDetails(req.body);
  try {
    const ticketDetailSave = await ticketDetail.save();
    return res.json({
      ok: true,
      ticketDetail: ticketDetailSave,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
module.exports = { getTicketDetail, postTicketDetail };
