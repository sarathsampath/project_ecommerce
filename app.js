var express = require("express");
var app = express();
var ecommerceRoutes = require("./Routes/ecommerce");
const bodyparser = require("body-Parser");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
var ecommerceHelper = require("./Utils/fileHelper");

async function authenticationSellerFunction(req, res, next) {
  var password = req.body.sellerPassword;
  var data = await ecommerceHelper.fileRead("./Data/seller.json");
  data = JSON.parse(data);
  var checkPassword = data.sellerPassword;
  if (checkPassword == password) {
    return next();
  } else {
    res.send("invalid login");
  }
}

async function authenticationProductFunction(req, res, next) {
  var sellerId = req.body.sellerId;
  var data = await ecommerceHelper.fileRead("./Data/seller.json");
  data = JSON.parse(data);
  var status = false;
  for (var i = 0; i < data.seller.length; i++) {
    if (data.seller[i].sellerId == sellerId) {
      status = true;
      return next();
    }
  }
  if (status == false) {
    res.send("invalid login");
  }
}
async function authenticationCustomerFunction(req, res, next) {
  var customerId = req.params.customerId;
  var customerDetails = req.body.customerDetails;
  var data = await ecommerceHelper.fileRead("./Data/customer.json");
  data = JSON.parse(data);
  var status = false;
  for (var i = 0; i < data.customer.length; i++) {
    if (
      data.customer[i].customerId == customerId &&
      data.customer[i].customerDetails.customerMail ==
        customerDetails.customerMail &&
      data.customer[i].customerDetails.customerPassword ==
        customerDetails.customerPassword &&
      data.customer[i].isActive == true
    ) {
      status = true;
      return next();
    }
  }
  if (status == false) {
    res.send("invalid login");
  }
}
async function authenticationCustomerPostFunction(req, res, next) {
  var customerDetails = req.body.customerDetails;
  console.log(customerDetails);
  var data = await ecommerceHelper.fileRead("./Data/customer.json");
  data = JSON.parse(data);

  var status = false;
  for (var i = 0; i < data.customer.length; i++) {
    if (
      data.customer[i].customerDetails.customerMail ==
        customerDetails.customerMail &&
      data.customer[i].isActive == true
    ) {
      status = true;
      res.send("Mail id already exists");
      break;
    }
  }
  if (status == false) {
    return next();
  }
}

async function authenticationCheckIdPostFunction(req, res, next) {
  var customerId = req.body.customerId;
  var productId = req.body.productId;
  var data = await ecommerceHelper.fileRead("./Data/customer.json");
  data = JSON.parse(data);

  var status1 = false;
  for (var i = 0; i < data.customer.length; i++) {
    if (
      data.customer[i].customerId == customerId &&
      data.customer[i].isActive == true
    ) {
      status1 = true;

      break;
    }
  }
  var data = await ecommerceHelper.fileRead("./Data/products.json");
  data = JSON.parse(data);

  var status2 = false;
  for (var i = 0; i < data.products.length; i++) {
    if (
      data.products[i].productId == productId &&
      data.products[i].isActive == true
    ) {
      status2 = true;

      break;
    }
  }
  if (status1 == true && status2 == true) {
    next();
  } else {
    res.send("server error");
  }
}
async function authenticationCheckIdFunction(req, res, next) {
  var customerId = req.params.customerId;
  var productId = req.params.productId;
  var data = await ecommerceHelper.fileRead("./Data/customer.json");
  data = JSON.parse(data);

  var status1 = false;
  for (var i = 0; i < data.customer.length; i++) {
    if (
      data.customer[i].customerId == customerId &&
      data.customer[i].isActive == true
    ) {
      status1 = true;
      break;
    }
  }
  var data = await ecommerceHelper.fileRead("./Data/products.json");
  data = JSON.parse(data);

  var status2 = false;
  for (var i = 0; i < data.products.length; i++) {
    if (
      data.products[i].productId == productId &&
      data.products[i].isActive == true
    ) {
      status2 = true;
      break;
    }
  }
  if (status1 == true && status2 == true) {
    next();
  } else {
    res.send("server error");
  }
}

app.get("/seller", ecommerceRoutes.listSeller);
app.put(
  "/seller/:sellerId/:sellerName",
  authenticationSellerFunction,
  function (req, res, next) {
    ecommerceRoutes.updateSeller(req, res);
  }
);
app.delete("/seller/:sellerId", authenticationSellerFunction, function (
  req,
  res,
  next
) {
  ecommerceRoutes.deleteSeller(req, res);
});
app.post("/seller", authenticationSellerFunction, function (req, res, next) {
  ecommerceRoutes.postSeller(req, res);
});

app.post("/product", authenticationProductFunction, function (req, res, next) {
  ecommerceRoutes.postProduct(req, res);
});
app.delete("/product/:productId", authenticationProductFunction, function (
  req,
  res,
  next
) {
  ecommerceRoutes.deleteProduct(req, res);
});
app.put("/product/:productId", authenticationProductFunction, function (
  req,
  res,
  next
) {
  ecommerceRoutes.updateProduct(req, res);
});

app.post("/customer/", authenticationCustomerPostFunction, function (
  req,
  res,
  next
) {
  ecommerceRoutes.postCustomer(req, res);
});

app.put("/customer/:customerId", authenticationCustomerFunction, function (
  req,
  res,
  next
) {
  ecommerceRoutes.updateCustomer(req, res);
});
app.delete("/customer/:customerId", authenticationCustomerFunction, function (
  req,
  res,
  next
) {
  ecommerceRoutes.deleteCustomer(req, res);
});

app.post("/cart", authenticationCheckIdPostFunction, function (req, res, next) {
  ecommerceRoutes.postCart(req, res);
});
app.delete(
  "/cart/:customerId/:productId",
  authenticationCheckIdFunction,
  function (req, res, next) {
    ecommerceRoutes.deleteCart(req, res);
  }
);

app.post("/wishlist", authenticationCheckIdPostFunction, function (
  req,
  res,
  next
) {
  ecommerceRoutes.postWishlist(req, res);
});

app.delete(
  "/wishlist/:customerId/:productId",
  authenticationCheckIdFunction,
  function (req, res, next) {
    ecommerceRoutes.deleteWishlist(req, res);
  }
);

app.post("/order", ecommerceRoutes.postOrder);
app.listen(3000);
