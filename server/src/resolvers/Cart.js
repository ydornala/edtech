function items(parent, args, context) {
  return context.prisma.cart({ id: parent.id }).items();
}

module.exports = {
  items
};
