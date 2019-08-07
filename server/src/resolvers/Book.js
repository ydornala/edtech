function specifications(parent, args, context) {
  return context.prisma.book({ id: parent.id }).specifications();
}

module.exports = {
  specifications
};
