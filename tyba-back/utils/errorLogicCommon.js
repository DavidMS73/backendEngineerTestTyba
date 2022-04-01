exports.errorLogic = async (res, error) => {
  return res.status(500).send({
    create: false,
    message: error.details[0].message,
  });
};
