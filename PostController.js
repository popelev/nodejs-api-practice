class Postcontroller {
  async JsonParse(req, res) {
    try {
      console.log("POST");
      res.status(200).json(req.body);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new Postcontroller();
