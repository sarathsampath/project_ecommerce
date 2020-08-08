var ecommerceServices = require("../Services/ecommerce");
var logger = require("../Utils/loggers");
var ecommerceUtils = require("../Utils/validateHelper");
var ecommerceConstants = require("../Data/constants");
var ecommerceResponse = require("../Utils/responseHelper");
/**
List the available sellers
 */
function listSeller() {
  try {
    logger.info("Controllers:listselller:start");
    var status = ecommerceServices.listSeller();
    logger.info("controllers:listSeller:status" + status);
    logger.info("Controllers:listselller:end");
    return status;
  } catch (err) {
    var status = ecommerceResponse.responseFailure(
      false,
      err,
      ecommerceConstants.VALID
    );
    logger.error(err);
    logger.info("Controllers:listselller:end");
    return status;
  }
}
/**
add new seller
 */
async function postSeller(sellerDetails) {
  try {
    logger.info("Controllers: postSeller:start");
    if (
      sellerDetails.sellerName == undefined ||
      sellerDetails.sellerAddress == undefined ||
      sellerDetails.sellerContact == undefined
    ) {
      throw new Error("Invalid types");
    } else {
      var mobileNumberResponse = ecommerceUtils.contactValidator(
        sellerDetails.sellerContact
      );
      var nameResponse = ecommerceUtils.nameValidator(sellerDetails.sellerName);
      if (mobileNumberResponse == true && nameResponse == true) {
        var status = await ecommerceServices.postSeller(sellerDetails);
        logger.info("controllers: postSeller:status" + status);
        logger.info("Controllers: postSeller:end");
        logger.info(status);
        return status;
      } else {
        throw new Error("Invalid name or mobilenumber");
      }
    }
  } catch (err) {
    error = "Invalid name or mobilenumber";
    logger.error(err);
    logger.info("Controllers: postSeller:end");
    var status = ecommerceResponse.responseFailure(
      false,
      error,
      ecommerceConstants.VALID
    );
    return status;
  }
}
/**
Update existing seller
 */
async function updateSeller(sellerId, sellerName) {
  try {
    logger.info("Controllers:updateSeller:start");
    var status = await ecommerceServices.updateSeller(sellerId, sellerName);
    logger.info("controllers:updateSeller:status" + status);
    logger.info("Controllers:updateSeller:end");
    logger.info(status);
    return status;
  } catch (err) {
    logger.error(err);
    logger.info("Controllers:updateSeller:end");
    var status = ecommerceResponse.responseFailure(
      false,
      err,
      ecommerceConstants.VALID
    );
    return status;
  }
}
/**
delete seller
 */
async function deleteSeller(sellerId) {
  try {
    logger.info("Controllers: deleteSeller:start");
    var status = await ecommerceServices.deleteSeller(sellerId);
    logger.info("controllers: deleteSeller:status" + status);
    logger.info("Controllers: deleteSeller:end");
    logger.info(status);
    return status;
  } catch (err) {
    error = "invalid";
    logger.error(err);
    logger.info("Controllers: deleteSeller:end");
    var status = ecommerceResponse.responseFailure(
      false,
      error,
      ecommerceConstants.VALID
    );
    return status;
  }
}
/**
add new product
 */
async function postProduct(productDetails, sellerId) {
  try {
    logger.info("Controllers: postProduct:start");
    if (
      productDetails.productName == undefined ||
      productDetails.productDiscount == undefined ||
      productDetails.productStock == undefined ||
      productDetails.productPrice == undefined ||
      productDetails.productDescription == undefined
    ) {
      throw new Error("Invalid types");
    }
    if (productDetails.productStock > 1) {
      var status = await ecommerceServices.postProduct(
        productDetails,
        sellerId
      );
      logger.info("controllers: postProduct:status" + status);
      logger.info("Controllers: postProduct:end");
      logger.info(status);
      return status;
    } else {
      throw new Error("invalid Quantity ");
    }
  } catch (err) {
    error = "Invalid Details";
    logger.error(err);
    logger.info("Controllers: postProduct:end");
    var status = ecommerceResponse.responseFailure(
      false,
      error,
      ecommerceConstants.VALID
    );
    return status;
  }
}
/**
update existing product
 */
async function updateProduct(productDetails, productId, sellerId) {
  try {
    logger.info("Controllers: postProduct:start");
    if (
      sellerId == undefined &&
      productDetails.productName == undefined &&
      productDetails.productDiscount == undefined &&
      productDetails.productStock == undefined &&
      productDetails.productPrice == undefined &&
      productDetails.productDescription == undefined
    ) {
      throw new Error("Invalid types");
    }
    if (productDetails.productQuantity > 0) {
      var status = await ecommerceServices.updateProduct(
        productDetails,
        productId,
        sellerId
      );
      logger.info("controllers: updateProduct:status" + status);
      logger.info("Controllers: updateProduct:end");
      logger.info(status);
      return status;
    } else {
      throw new Error("invalid Quantity");
    }
  } catch (err) {
    error = "Invalid Details";
    logger.error(err);
    logger.info("Controllers: postProduct:end");
    var status = ecommerceResponse.responseFailure(
      false,
      error,
      ecommerceConstants.VALID
    );
    return status;
  }
}
/**
delete existing product
 */
async function deleteProduct(productId) {
  try {
    logger.info("Controllers: deleteProduct:start");
    var status = await ecommerceServices.deleteProduct(productId);
    logger.info("controllers: deleteProduct:status" + status);
    logger.info("Controllers: deleteProduct:end");
    logger.info(status);
    return status;
  } catch (err) {
    error = "invalid";
    logger.error(err);
    logger.info("Controllers: deleteProduct:end");
    var status = ecommerceResponse.responseFailure(
      false,
      error,
      ecommerceConstants.VALID
    );
    return status;
  }
}
/**
Add a new customer
 */
async function postCustomer(customerDetails) {
  try {
    logger.info("Controllers: post:start");
    if (
      customerDetails.customerName == undefined ||
      customerDetails.customerMail == undefined ||
      customerDetails.customerPassword == undefined ||
      customerDetails.customerContact == undefined
    ) {
      throw new Error("Invalid types");
    }
    var customerContactResponse = ecommerceUtils.contactValidator(
      customerDetails.customerContact
    );
    var customerPasswordResponse = ecommerceUtils.passwordValidator(
      customerDetails.customerPassword
    );
    var customerMailResponse = ecommerceUtils.mailValidator(
      customerDetails.customerMail
    );
    if (
      customerContactResponse == true &&
      customerPasswordResponse == true &&
      customerMailResponse == true
    ) {
      var status = ecommerceServices.postCustomer(customerDetails);
      logger.info("controllers: postProduct:status" + status);
      logger.info("Controllers: postProduct:end");
      logger.info(status);
      return status;
    } else {
      throw new Error("invalid password or mail or contact ");
    }
  } catch (err) {
    error = "Invalid Details";
    logger.error(err);
    logger.info("Controllers: postCustomer:end");
    var status = ecommerceResponse.responseFailure(
      false,
      error,
      ecommerceConstants.VALID
    );
    return status;
  }
}
/**
update existing customer
 */
async function updateCustomer(customerDetails, customerId) {
  try {
    logger.info("Controllers:updateCustomer:start");
    if (
      customerDetails.customerName == undefined &&
      customerDetails.customerPassword == undefined &&
      customerDetails.customerContact == undefined
    ) {
      throw new Error("invalid types");
    } else {
      var customerContactResponse = ecommerceUtils.contactValidator(
        customerDetails.customerContact
      );
      var customerPasswordResponse = ecommerceUtils.passwordValidator(
        customerDetails.customerPassword
      );
      if (customerPasswordResponse == true && customerContactResponse == true) {
        var status = await ecommerceServices.updateCustomer(
          customerDetails,
          customerId
        );
        logger.info("controllers: updateCustomer:status" + status);
        logger.info("Controllers: updateCustomer:end");
        logger.info(status);
        return status;
      } else {
        throw new Error("invalid password or contact");
      }
    }
  } catch (err) {
    error = "Invalid Details";
    logger.error(err);
    logger.info("Controllers: updateCustomer:end");
    var status = ecommerceResponse.responseFailure(
      false,
      error,
      ecommerceConstants.VALID
    );
    return status;
  }
}
/**
delete existing customer
 */
async function deleteCustomer(customerId) {
  try {
    logger.info("Controllers: deleteCustomer:start");
    var status = await ecommerceServices.deleteCustomer(customerId);
    logger.info("controllers: deleteCustomer:status" + status);
    logger.info("Controllers: deleteCustomer:end");
    logger.info(status);
    return status;
  } catch (err) {
    error = "invalid";
    logger.error(err);
    logger.info("Controllers: deleteCustomer:end");
    var status = ecommerceResponse.responseFailure(
      false,
      error,
      ecommerceConstants.VALID
    );
    return status;
  }
}
/**
add item to cart
 */
async function postCart(customerId, productId, productDetails) {
  try {
    logger.info("Controllers: postCart:start");
    if (
      productDetails.productQuantity == undefined ||
      productDetails.productName == undefined ||
      productDetails.productPrice == undefined ||
      productDetails.productDiscount == undefined ||
      (customerId == undefined && productId == undefined)
    ) {
      logger.info("Controllers: postCart:start");
      throw new Error("Invalid types");
    }

    productDetails.productPrice =
      (productDetails.productPrice -
        (productDetails.productPrice * productDetails.productDiscount) / 100) *
      productDetails.productQuantity;
    var status = await ecommerceServices.postCart(
      customerId,
      productId,
      productDetails
    );
    logger.info("controllers: postCart:status" + status);
    logger.info("Controllers: postCart:end");
    logger.info(status);
    return status;
  } catch (err) {
    console.log(err);
    logger.error(err);
    logger.info("Controllers: postCart:end");
    var status = ecommerceResponse.responseFailure(
      false,
      "invalid types",
      ecommerceConstants.INVALID
    );
    return status;
  }
}
/**
delete Item from cart
 */
async function deleteCart(customerId, productId) {
  try {
    logger.info("Controllers: deleteCart:start");
    var status = await ecommerceServices.deleteCart(customerId, productId);
    logger.info("controllers: deleteCart:status" + status);
    logger.info("Controllers: deleteCart:end");
    logger.info(status);
    return status;
  } catch (err) {
    error = "invalid";
    logger.error(err);
    logger.info("Controllers: deleteCart:end");
    var status = ecommerceResponse.responseFailure(
      false,
      error,
      ecommerceConstants.VALID
    );
    return status;
  }
}
/**
add product to wishlist
 */
async function postWishlist(customerId, productId, productDetails) {
  try {
    logger.info("Controllers: postWishlist:start");
    if (
      productDetails.productName == undefined ||
      productDetails.productPrice == undefined ||
      productDetails.productDiscount == undefined ||
      (customerId == undefined && productId == undefined)
    ) {
      logger.info("Controllers: postCart:start");
      throw new Error("Invalid types");
    }
    productDetails.productPrice =
      productDetails.productPrice -
      (productDetails.productPrice * productDetails.productDiscount) / 100;
    var status = await ecommerceServices.postWishlist(
      customerId,
      productId,
      productDetails
    );
    logger.info("controllers: postCart:status" + status);
    logger.info("Controllers: postCart:end");
    logger.info(status);
    return status;
  } catch (err) {
    console.log(err);
    logger.error(err);
    logger.info("Controllers: postCart:end");
    var status = ecommerceResponse.responseFailure(
      false,
      "invalid types",
      ecommerceConstants.INVALID
    );
    return status;
  }
}
/**
delete Item from wishlist
 */
async function deleteWishlist(customerId, productId) {
  try {
    logger.info("Controllers: deleteWishlist:start");
    var status = await ecommerceServices.deleteWishlist(customerId, productId);
    logger.info("controllers: deleteWishlist:status" + status);
    logger.info("Controllers: deleteWishlist:end");
    logger.info(status);
    return status;
  } catch (err) {
    error = "invalid";
    logger.error(err);
    logger.info("Controllers: deleteWishlist:end");
    var status = ecommerceResponse.responseFailure(
      false,
      error,
      ecommerceConstants.VALID
    );
    return status;
  }
}
/**
Order Item from cart
 */

async function postOrder(customerId, cartProducts) {
  try {
    logger.info("Controllers:postOrder:start");
    total = 0;
    for (var i = 0; i < cartProducts.length; i++) {
      total = cartProducts[i].productDetails.productPrice =
        cartProducts[i].productDetails.productPrice -
        (cartProducts[i].productDetails.productPrice *
          cartProducts[i].productDetails.productDiscount) /
          100 +
        total;

      if (
        cartProducts[i].productDetails.productName == undefined ||
        cartProducts[i].productDetails.productPrice == undefined ||
        cartProducts[i].productDetails.productDiscount == undefined ||
        (cartProducts[i].customerId == undefined &&
          cartProducts[i].productId == undefined)
      ) {
        logger.info("Controllers:postOrder :start");
        throw new Error("Invalid types");
      }
    }
    console.log(total);
    var status = await ecommerceServices.postOrder(
      customerId,
      cartProducts,
      total
    );
    logger.info("controllers: postCart:status" + status);
    logger.info("Controllers: postCart:end");
    logger.info(status);
    return status;
  } catch (err) {
    console.log(err);
    logger.error(err);
    logger.info("Controllers: postCart:end");
    var status = ecommerceResponse.responseFailure(
      false,
      "invalid types",
      ecommerceConstants.INVALID
    );
    return status;
  }
}
module.exports = {
  listSeller,
  updateSeller,
  deleteSeller,
  postSeller,
  postProduct,
  deleteProduct,
  updateProduct,
  updateCustomer,
  deleteCustomer,
  postCustomer,
  postCart,
  postWishlist,
  deleteCart,
  deleteWishlist,
  postOrder,
};
