var ecommerceHelper = require("../Utils/fileHelper");
var ecommerceConstants = require("../Data/constants");
var logger = require("../Utils/loggers");
var ecommerceResponse = require("../Utils/responseHelper");
const shortid = require("shortid");
const moment = require("moment");

/**
View all the sellers
*/
function listSeller() {
  try {
    logger.info("services:list seller:start");
    var data = ecommerceHelper.fileRead("./Data/seller.json");
    logger.info("services:list seller:status" + data);
    logger.info("services:list seller:end");
    var status = ecommerceResponse.responseSuccess(
      true,
      "list of sellers",
      ecommerceConstants.VALID,
      data
    );
    return status;
  } catch (err) {
    logger.error(err);
    var status = ecommerceResponse.responseFailure(
      true,
      err,
      ecommerceConstants.VALID
    );
    return status;
    logger.info("services:list seller:end");
  }
}
/**
add a new seller
 */
async function postSeller(sellerDetails) {
  try {
    logger.info("services:postSeller:start");
    var data = await ecommerceHelper.fileRead("./Data/seller.json");
    data = JSON.parse(data);
    var variable = {
      sellerId: shortid.generate(),
      sellerDetails: sellerDetails,
      isActive: true,
    };
    data.seller[data.seller.length] = variable;
    var data1 = await ecommerceHelper.fileWrite("./Data/seller.json", data);
    var status = ecommerceResponse.responseSuccess(
      true,
      "post Done",
      ecommerceConstants.VALID,
      data1
    );
    logger.info("services:postSeller:status" + status);
    logger.info("services:postSeller:end");
    return status;
  } catch (err) {
    logger.error(err);
    var status = ecommerceResponse.responseFailure(
      false,
      "seller not found",
      ecommerceConstants.VALID
    );
	logger.info("services:postSeller:end");
    return status;
    
  }
}
/**
Update seller
 */
async function updateSeller(sellerId, sellerName) {
  try {
    logger.info("services:updateSeller:start");
    var data = await ecommerceHelper.fileRead("./Data/seller.json");
    data = JSON.parse(data);
    var check = false;
    for (var i = 0; i < data.seller.length; i++) {
      if (
        data.seller[i].sellerId == sellerId &&
        data.seller[i].isActive == true
      ) {
        check = true;
        data.seller[i].sellerDetails.sellerName = sellerName;
      }
    }
    logger.info(data.seller[0].sellerDetails.sellerName);
    if (check == false) {
      var status = ecommerceResponse.responseFailure(
        false,
        "Seller Not found",
        ecommerceConstants.VALID
      );
      return status;
    } else {
      var data1 = await ecommerceHelper.fileWrite("./Data/seller.json", data);

      var status = ecommerceResponse.responseSuccess(
        true,
        "Updation Done",
        ecommerceConstants.VALID,
        data1
      );
      logger.info("services:updateSeller:status" + status);
      logger.info("services:updateSeller:end");

      return status;
    }
  } catch (err) {
    logger.error(err);

    var status = ecommerceResponse.responseFailure(
      false,
      error,
      ecommerceConstants.VALID
    );
	logger.info("services:updateSeller:end");
    return status;
    
  }
}
/**
delete seller
 */
async function deleteSeller(sellerId) {
  try {
    logger.info("services:deleteSeller:start");
    var data = await ecommerceHelper.fileRead("./Data/seller.json");
    data = JSON.parse(data);
    var check = false;
    for (var i = 0; i < data.seller.length; i++) {
      if (
        data.seller[i].sellerId == sellerId &&
        data.seller[i].isActive == true
      ) {
        check = true;
        data.seller[i].isActive = false;
        var data1 = await ecommerceHelper.fileRead("./Data/products.json");
        data1 = JSON.parse(data1);
        for (var i = 0; i < data1.products.length; i++) {
          if (
            data1.products[i].sellerId == sellerId &&
            data1.products[i].isActive == true
          ) {
            check = true;
            data1.products[i].isActive = false;
          }
        }
        var data1 = await ecommerceHelper.fileWrite(
          "./Data/products.json",
          data1
        );
        var status = ecommerceResponse.responseSuccess(
          true,
          "delete Done",
          ecommerceConstants.VALID,
          data1
        );
        logger.info("services:deleteProduct:status" + status);
        logger.info("services:deleteProduct:end");
      }
    }
    if (check == false) {
      var status = ecommerceResponse.responseFailure(
        false,
        "Seller Not found",
        ecommerceConstants.VALID
      );
      return status;
    } else {
      var data1 = await ecommerceHelper.fileWrite("./Data/seller.json", data);

      var status = ecommerceResponse.responseSuccess(
        true,
        "delete Done",
        ecommerceConstants.VALID,
        data1
      );
      logger.info("services:deleteSeller:status" + status);
      logger.info("services:deleteSeller:end");

      return status;
    }
  } catch (err) {
    logger.error(err);
    var status = ecommerceResponse.responseFailure(
      false,
      "seller not found",
      ecommerceConstants.VALID
    );logger.info("services:deleteSeller:end");
    return status;
    
  }
}
/**
add new product
 */
async function postProduct(productDetails, sellerId) {
  try {
    logger.info("services:postProduct:start");
    var data = await ecommerceHelper.fileRead("./Data/products.json");
    data = JSON.parse(data);
    var variable = {
      sellerId: sellerId,
      productId: shortid.generate(),
      productDetails: productDetails,
      isActive: true,
    };
    data.products[data.products.length] = variable;
    var data1 = await ecommerceHelper.fileWrite("./Data/products.json", data);
    var status = ecommerceResponse.responseSuccess(
      true,
      "product posted",
      ecommerceConstants.VALID,
      data1
    );
    logger.info("services:postProduct:status" + status);
    logger.info("services:postProduct:end");
    return status;
  } catch (err) {
    logger.error(err);
    var status = ecommerceResponse.responseFailure(
      false,
      "product not found",
      ecommerceConstants.VALID
    ); logger.info("services:postProduct:end");
    return status;
   
  }
}
/**
update existing product
 */
async function updateProduct(productDetails, productId, sellerId) {
  try {
    logger.info("services:updateProduct:start");
    var condition = false;
    logger.info(productId + ":" + sellerId);
    var data = await ecommerceHelper.fileRead("./Data/products.json");
    data = JSON.parse(data);
    var variable = {
      sellerId: sellerId,
      productId: productId,

      productDetails: productDetails,
      isActive: true,
    };

    for (var i = 0; i < data.products.length; i++) {
      if (
        data.products[i].productId == productId &&
        data.products[i].sellerId == sellerId &&
        data.products[i].isActive == true
      ) {
        condition = true;
        data.products[i].productDetails = variable;
        logger.info(data.products[i]);
        break;
      }
    }
    if (condition == false) {
      throw new Error("id not found");
    } else {
      var data1 = await ecommerceHelper.fileWrite("./Data/products.json", data);
      var status = ecommerceResponse.responseSuccess(
        true,
        "product updated",
        ecommerceConstants.VALID,
        data1
      );
      logger.info("services:updateProduct:status" + status);
      logger.info("services:updateProduct:end");
      return status;
    }
  } catch (err) {
    logger.error(err);
    var status = ecommerceResponse.responseFailure(
      false,
      "product not found",
      ecommerceConstants.VALID
    );logger.info("services:updateProduct:end");
    return status;
    
  }
}
/**
delete product
 */
async function deleteProduct(productId) {
  try {
    logger.info("services:deleteProduct:start");
    var data = await ecommerceHelper.fileRead("./Data/products.json");
    data = JSON.parse(data);
    var check = false;
    for (var i = 0; i < data.products.length; i++) {
      if (
        data.products[i].productId == productId &&
        data.products[i].isActive == true
      ) {
        check = true;
        data.products[i].isActive = false;
      }
    }
    if (check == false) {
      var status = ecommerceResponse.responseFailure(
        false,
        "product Not found",
        ecommerceConstants.VALID
      );
      return status;
    } else {
      var data1 = await ecommerceHelper.fileWrite("./Data/products.json", data);

      var status = ecommerceResponse.responseSuccess(
        true,
        "delete Done",
        ecommerceConstants.VALID,
        data1
      );
      logger.info("services:deleteProduct:status" + status);
      logger.info("services:deleteProduct:end");

      return status;
    }
  } catch (err) {
    logger.error(err);
    var status = ecommerceResponse.responseFailure(
      false,
      "product not found",
      ecommerceConstants.VALID
    );logger.info("services:deleteProduct:end");
    return status;
    
  }
}
/**
add a new customer
 */
async function postCustomer(customerDetails) {
  try {
    logger.info("services:postcustomer:start");
    var data = await ecommerceHelper.fileRead("./Data/customer.json");
    data = JSON.parse(data);
    var variable = {
      customerId: shortid.generate(),
      customerDetails: customerDetails,
      isActive: true,
    };
    data.customer[data.customer.length] = variable;
    var data1 = await ecommerceHelper.fileWrite("./Data/customer.json", data);
    var status = ecommerceResponse.responseSuccess(
      true,
      "customerDetails posted",
      ecommerceConstants.VALID,
      data1
    );
    logger.info("services:postcustomerDetails:status" + status);
    logger.info("services:postcustomerDetails:end");
    return status;
  } catch (err) {
    logger.error(err);
    var status = ecommerceResponse.responseFailure(
      false,
      "cannot post",
      ecommerceConstants.VALID
    );
    return status;
    logger.info("services:postcustomerDetails:end");
  }
}
/**
update customer details
 */
async function updateCustomer(customerDetails, customerId) {
  try {
    logger.info("services:updateCustomer:start");
    var condition = false;

    var data = await ecommerceHelper.fileRead("./Data/customer.json");
    data = JSON.parse(data);
    var variable = {
      customerId: customerId,
      customerDetails: customerDetails,
      isActive: true,
    };

    for (var i = 0; i < data.customer.length; i++) {
      if (
        data.customer[i].customerId == customerId &&
        data.customer[i].isActive == true
      ) {
        condition = true;
        data.customer[i] = variable;
        logger.info(data.customer[i]);
        break;
      }
    }
    if (condition == false) {
      throw new Error("id not found");
    } else {
      var data1 = await ecommerceHelper.fileWrite("./Data/customer.json", data);
      var status = ecommerceResponse.responseSuccess(
        true,
        "customer updated",
        ecommerceConstants.VALID,
        data1
      );
      logger.info("services:updatecustomer :status" + status);
      logger.info("services:updatecustomer :end");
      return status;
    }
  } catch (err) {
    logger.error(err);
    var status = ecommerceResponse.responseFailure(
      false,
      "product not found",
      ecommerceConstants.VALID
    );
    return status;
    logger.info("services:update customer:end");
  }
}
/**
delete customer details
 */
async function deleteCustomer(customerId) {
  try {
    logger.info("services:deleteCustomer:start");
    var data = await ecommerceHelper.fileRead("./Data/customer.json");
    data = JSON.parse(data);
    var check = false;
    for (var i = 0; i < data.customer.length; i++) {
      if (data.customer[i].customerId == customerId) {
        check = true;
        data.customer[i].isActive = false;
        break;
      }
    }
    if (check == false) {
      var status = ecommerceResponse.responseFailure(
        false,
        "customer Not found",
        ecommerceConstants.VALID
      );
      return status;
    } else {
      var data1 = await ecommerceHelper.fileWrite("./Data/customer.json", data);

      var status = ecommerceResponse.responseSuccess(
        true,
        "delete Done",
        ecommerceConstants.VALID,
        data1
      );
      logger.info("services:deletecustomer:status" + status);
      logger.info("services:deletecustomer:end");

      return status;
    }
  } catch (err) {
    logger.error(err);
    var status = ecommerceResponse.responseFailure(
      false,
      "product not found",
      ecommerceConstants.VALID
    );
    return status;
    logger.info("services:deleteProduct:end");
  }
}
/**
add item to cart
 */
async function postCart(customerId, productId, productDetails) {
  try {
    logger.info("services:postCart:start");
    var data = await ecommerceHelper.fileRead("./Data/cart.json");
    var wishListData = await ecommerceHelper.fileRead("./Data/wishList.json");
    var productData = await ecommerceHelper.fileRead("./Data/products.json");
    productData = JSON.parse(productData);
    var productStockCondition = false;
    for (var i = 0; i < productData.products.length; i++) {
      if (
        productData.products[i].productId == productId &&
        productData.products[i].productDetails.productStock > 1 &&
        productData.products[i].isActive == true
      ) {
        productStockCondition = true;
        break;
      }
    }
    wishListData = JSON.parse(wishListData);
    if (productStockCondition == true) {
      for (var i = 0; i < wishListData.wishlist.length; i++) {
        if (
          wishListData.wishlist[i].customerId == customerId &&
          wishListData.wishlist[i].productId == productId
        ) {
          wishListData.wishlist.splice(i, 1);
          var data1 = await ecommerceHelper.fileWrite(
            "./Data/wishList.json",
            wishListData
          );
          break;
        }
      }
    }

    data = JSON.parse(data);
    var variable = {
      productId: productId,
      productDetails: productDetails,
      isActive: true,
      isAvailable: true,
    };
    var replaceProductCondition1 = false;
    var replaceProductCondition = false;
    console.log(data.cart[0].cartProducts.length);
    for (var i = 0; i < data.cart.length; i++) {
      var size = data.cart[i].cartProducts.length;
      for (var j = 0; j < size; j++) {
        if (data.cart[i].customerId == customerId) {
          replaceProductCondition = true;
        }
        if (
          replaceProductCondition == true &&
          data.cart[i].cartProducts[j].productId == productId
        ) {
          replaceProductCondition1 = true;
          data.cart[i].cartProducts[j] = variable;
          break;
        }
      }
      if (
        replaceProductCondition == true &&
        replaceProductCondition1 == false
      ) {
        data.cart[i].cartProducts[size] = variable;
        break;
      }
    }
    var variable2 = {
      customerId: customerId,
      cartProducts: [variable],
    };
    if (replaceProductCondition == false && replaceProductCondition1 == false) {
      data.cart[data.cart.length] = variable2;
    }
    var data1 = await ecommerceHelper.fileWrite("./Data/cart.json", data);
    var status = ecommerceResponse.responseSuccess(
      true,
      "post Done",
      ecommerceConstants.VALID,
      data1
    );
    logger.info("services:postCart:status" + status);
    logger.info("services:postCart:end");
    return status;
  } catch (err) {
    console.log(err);
    logger.error(err);
    var status = ecommerceResponse.responseFailure(
      false,
      "out of stock",
      ecommerceConstants.VALID
    );
    return status;
    logger.info("services:postSeller:end");
  }
}

/**
delete item from cart
 */
async function deleteCart(customerId, productId) {
  try {
    logger.info("services:deleteCart:start");
    var data = await ecommerceHelper.fileRead("./Data/cart.json");
    data = JSON.parse(data);
    var check = false;
    for (var i = 0; i < data.cart.length; i++) {
      if (
        data.cart[i].customerId == customerId &&
        data.cart[i].productId == productId
      ) {
        check = true;
        data.cart.splice(i, 1);
        break;
      }
    }
    if (check == false) {
      var status = ecommerceResponse.responseFailure(
        false,
        "server error",
        ecommerceConstants.VALID
      );
      return status;
    } else {
      var data1 = await ecommerceHelper.fileWrite("./Data/cart.json", data);

      var status = ecommerceResponse.responseSuccess(
        true,
        "delete Done",
        ecommerceConstants.VALID,
        data1
      );
      logger.info("services:deletecart:status" + status);
      logger.info("services:deletecart:end");

      return status;
    }
  } catch (err) {
    logger.error(err);
    var status = ecommerceResponse.responseFailure(
      false,
      "product not found",
      ecommerceConstants.VALID
    );
    return status;
    logger.info("services:deleteProduct:end");
  }
}
/**
add Item to wishlist
 */
async function postWishlist(customerId, productId, productDetails) {
  try {
    logger.info("services:postWishlist:start");

    var data = await ecommerceHelper.fileRead("./Data/wishList.json");
    data = JSON.parse(data);
    for (var i = 0; i < data.wishlist.length; i++) {
      var date1 = new Date(data.wishlist[i].productWishlistDate);
      var date2 = new Date();
      diff = Math.abs(date2.getTime() - date1.getTime());
      diff = Math.ceil(diff / (3600 * 1000 * 24));
      if (diff > 30) {
        data.wishlist.splice(i, 1);
      }
    }

    var now = new Date();
    var variable = {
      customerId: customerId,
      productId: productId,
      productWishlistDate: now,
      productDetails: productDetails,
      isActive: true,
    };
    var replaceProductCondition = false;
    for (var i = 0; i < data.wishlist.length; i++) {
      if (
        data.wishlist[i].productId == productId &&
        data.wishlist[i].customerId == customerId
      ) {
        replaceProductCondition = true;
        data.wishlist[i] = variable;
        break;
      }
    }

    if (replaceProductCondition == false) {
      data.wishlist[data.wishlist.length] = variable;
    }
    var data1 = await ecommerceHelper.fileWrite("./Data/wishList.json", data);
    var status = ecommerceResponse.responseSuccess(
      true,
      "post Done",
      ecommerceConstants.VALID,
      data1
    );
    logger.info("services:postWishlist:status" + data1);
    logger.info("services:postWishlist:end");
    return status;
  } catch (err) {
    console.log(err);
    logger.error(err);
    var status = ecommerceResponse.responseFailure(
      false,
      err,
      ecommerceConstants.VALID
    );
    return status;
    logger.info("services:postWishlist:end");
  }
}
/**
delete Item from wishlist
 */
async function deleteWishlist(customerId, productId) {
  try {
    logger.info("services:deleteWishlist:start");
    var data = await ecommerceHelper.fileRead("./Data/wishList.json");
    data = JSON.parse(data);
    var check = false;
    for (var i = 0; i < data.wishlist.length; i++) {
      if (
        data.wishlist[i].customerId == customerId &&
        data.wishlist[i].productId == productId
      ) {
        check = true;
        data.wishlist.splice(i, 1);
        break;
      }
    }
    if (check == false) {
      var status = ecommerceResponse.responseFailure(
        false,
        "server error",
        ecommerceConstants.VALID
      );
      return status;
    } else {
      var data1 = await ecommerceHelper.fileWrite("./Data/wishList.json", data);

      var status = ecommerceResponse.responseSuccess(
        true,
        "delete Done",
        ecommerceConstants.VALID,
        data1
      );
      logger.info("services:deletecart:status" + status);
      logger.info("services:deletecart:end");

      return status;
    }
  } catch (err) {
    logger.error(err);
    var status = ecommerceResponse.responseFailure(
      false,
      "product not found",
      ecommerceConstants.VALID
    );
    return status;
    logger.info("services:deleteProduct:end");
  }
}
/**
Order Item from cart
 */
async function postOrder(customerId, cartProducts, total) {
  try {
    logger.info("services:postOrder:start");
    var data = await ecommerceHelper.fileRead("./Data/products.json");
    data = JSON.parse(data);
    var sellerId = [];
    for (var i = 0; i < cartProducts.length; i++) {
      for (var j = 0; j < data.products.length; j++) {
        if (cartProducts[i].productId == data.products[j].productId) {
          sellerId[i] = data.products[j].sellerId;
          var data1 = parseInt(cartProducts[i].productDetails.productQuantity);
          var data2 = parseInt(data.products[j].productDetails.productStock);
          if (data1 > data2) {
            throw new Error(
              cartProducts[i].productDetails.productName + ":out of stock"
            );
          } else {
            data.products[j].productDetails.productStock = data2 - data1;
          }
        }
      }
    }

    var data1 = await ecommerceHelper.fileWrite("./Data/products.json", data);

    var data = await ecommerceHelper.fileRead("./Data/customer.json");
    data = JSON.parse(data);
    for (var i = 0; i < data.customer.length; i++) {
      if (data.customer[i].customerId == customerId) {
        data.customer[i].customerDetails.customerRewardpoints =
          parseInt(data.customer[i].customerDetails.customerRewardpoints) +
          cartProducts.length * 10;
        var customerDetails = data.customer[i].customerDetails;
        var data1 = await ecommerceHelper.fileWrite(
          "./Data/customer.json",
          data
        );
      }
    }

    var date = new Date();
    var variable = {
      customerId: customerId,
      orderId: shortid.generate(),
      order: cartProducts,
      orderDate: date,
      productTotal: total,
      customerDetails: customerDetails,
      isActive: true,
    };
    var data = await ecommerceHelper.fileRead("./Data/order.json");
    data = JSON.parse(data);
    data.productOrders[data.productOrders.length] = variable;
    var data = await ecommerceHelper.fileWrite("./Data/order.json", data);

    var status = ecommerceResponse.responseSuccess(
      true,
      "post Done",
      ecommerceConstants.VALID,
      data
    );
    logger.info("services:postOrder:status" + data1);
    logger.info("services:postOrder:end");
    return status;
  } catch (err) {
    console.log(err);
    logger.error(err);
    var status = ecommerceResponse.responseFailure(
      false,
      err,
      ecommerceConstants.VALID
    );
    return status;
    logger.info("services:postWishlist:end");
  }
}

module.exports = {
  listSeller,
  updateSeller,
  deleteSeller,
  postSeller,
  postProduct,
  deleteProduct,
  postCustomer,
  updateProduct,
  updateCustomer,
  deleteCustomer,
  postCart,
  postWishlist,
  deleteCart,
  deleteWishlist,
  postOrder,
};
