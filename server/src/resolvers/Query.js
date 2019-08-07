async function feed(parent, args, context) {
  const count = await context.prisma
    .linksConnection({
      where: {
        OR: [
          { description_contains: args.filter },
          { url_contains: args.filter }
        ]
      }
    })
    .aggregate()
    .count();
  const links = await context.prisma.links({
    where: {
      OR: [{ description_contains: args.filter }, { url_contains: args.filter }]
    },
    skip: args.skip,
    first: args.first,
    orderBy: args.orderBy
  });
  
  return {
    count,
    links
  };
}


async function bookFeed(parent, args, context) {
  console.log('con ==> ',context.prisma)
  const count = await context.prisma
    .booksConnection({
      where: {
        OR: [
          { description_contains: args.filter },
          { url_contains: args.filter }
        ]
      }
    })
    .aggregate()
    .count();
  const books = await context.prisma.books({
    where: {
      OR: [{ description_contains: args.filter }, { url_contains: args.filter }]
    },
    skip: args.skip,
    first: args.first,
    orderBy: args.orderBy
  });

  return {
    count,
    books
  };
}


async function cartFeed(parent, args, context) {
  const count = await context.prisma
    .cartsConnection({
      where: {
        OR: [
          { description_contains: args.filter },
          { url_contains: args.filter }
        ]
      }
    })
    .aggregate()
    .count();
  const carts = await context.prisma.carts({
    where: {
      OR: [{ description_contains: args.filter }, { url_contains: args.filter }]
    },
    skip: args.skip,
    first: args.first,
    orderBy: args.orderBy
  });

  console.log("Carts =>", carts);
  return {
    count,
    carts
  };
}


module.exports = {
  feed,
  bookFeed,
  cartFeed
};
