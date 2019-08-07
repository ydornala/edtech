const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");

function post(parent, args, context) {
  return context.prisma.createLink({
    url: args.url,
    description: args.description
  });
}

async function signup(parent, args, context) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.createUser({ ...args, password });

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user
  };
}

async function login(parent, args, context) {
  const user = await context.prisma.user({ email: args.email });
  if (!user) {
    throw new Error("No such user found");
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  return {
    token: jwt.sign({ userId: user.id }, APP_SECRET),
    user
  };
}

async function vote(parent, args, context) {
  const userId = getUserId(context);
  const linkExists = await context.prisma.$exists.vote({
    user: { id: userId },
    link: { id: args.linkId }
  });
  if (linkExists) {
    throw new Error(`Already voted for link: ${args.linkId}`);
  }

  return context.prisma.createVote({
    user: { connect: { id: userId } },
    link: { connect: { id: args.linkId } }
  });
}

async function cart(parent, args, context) {
  let cart;
  if(args.cartId) {
    cart = await context.prisma.cart({
      id: args.cartId
    });
  }

  if(!cart) {
    cart = await context.prisma.createCart({
      items: args.items
    });
  }

  let cartItems = await context.prisma.cart({id: cart.id}).items() || [];

  let cartItem = null;
  if(cartItems.length > 0) {
    const index = cartItems.findIndex(i => i.productId === args.productId);
    cartItem = cartItems[index];
  }

  if(cartItem) {
    await context.prisma.updateCartItem({
      where: {
        id: cartItem.id
      },
      data: {
        productId: args.productId,
        name: args.name,
        price: args.price,
        quantity: Number(cartItem.quantity) + Number(args.quantity),
        cart: {connect: {id: cart.id}}
      }
    });
  } else {
    await context.prisma.createCartItem({
      productId: args.productId,
      name: args.name,
      price: args.price,
      quantity: args.quantity,
      cart: {connect: {id: cart.id}}
    });
  }

  return cart
}

module.exports = {
  post,
  signup,
  login,
  vote,
  cart
};
