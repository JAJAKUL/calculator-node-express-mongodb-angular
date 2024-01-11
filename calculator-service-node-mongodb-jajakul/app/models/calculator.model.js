module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      expression: String,
      output: String
    },
    { timestamps: true }
  );

  const Calculatoin = mongoose.model("calculation", schema);
  return Calculatoin;
};
