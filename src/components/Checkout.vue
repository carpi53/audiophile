<script setup>
import { useCartStore } from "../store/cart";
import { ref, reactive } from "vue";
import CheckoutConfirmation from "./CheckoutConfirmation.vue";
const cartStore = useCartStore();
// hide cart when the page is first loaded
cartStore.reveal = false;
// get the values of the form
const name = ref("");
const email = ref("");
const phone = ref("");
const address = ref("");
const zipcode = ref("");
const city = ref("");
const country = ref("");
const paymentMethod = ref("eMoney");
const emoneyNumber = ref("");
const emoneyPin = ref("");
// set the confirmation modal to false until the form is valid
const confirmationReveal = ref(false);
// set the error messages for the form validation
let errorMsg = reactive({
  name: "",
  email: "",
  phone: "",
  address: "",
  zipcode: "",
  city: "",
  country: "",
  emoneyNumber: "",
  emoneyPin: "",
});
// object that define which input is valid or not, the all form is valid when all the attributes are true
const inputsValidity = {
  name: false,
  email: false,
  phone: false,
  address: false,
  zipcode: false,
  city: false,
  country: false,
  emoneyNumber: false,
  emoneyPin: false,
};

// reset the error message when we type again in the input
function resetError(e) {
  errorMsg[e.target.id] = "";
}
// verify each form if it's valid or not
function onSubmit() {
  verifName(name.value);
  verifEmail(email.value);
  verifPhone(phone.value);
  verifAddress(address.value);
  verifZipcode(zipcode.value);
  verifCity(city.value);
  verifCountry(country.value);
  verifPaymentMethod(emoneyNumber.value, emoneyPin.value, paymentMethod.value);
  const keys = Object.keys(inputsValidity);
  // verify if there are invalid form, if one of the attributes in inputValidity is false
  const failedInput = keys.filter((key) => !inputsValidity[key]);
  if (!failedInput.length) {
    confirmationReveal.value = true;
  }
}
// verify if the name has only letters or space
function verifName(name) {
  if (!/^[A-Za-z ]+$/.test(name)) {
    errorMsg.name = "Wrong name";
    inputsValidity.name = false;
    return false;
  }
  errorMsg.name = "";
  inputsValidity.name = true;
  return true;
}
// verify if the email is valid with this format text@text.text
function verifEmail(email) {
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    errorMsg.email = "Wrong email";
    inputsValidity.email = false;
    return false;
  }
  errorMsg.email = "";
  inputsValidity.email = true;
  return true;
}
// verify if the phone has only numbers and 10 digits
function verifPhone(phone) {
  if (!/^\d{10}$/.test(phone)) {
    errorMsg.phone = "Wrong phone (10 digits)";
    inputsValidity.phone = false;
    return false;
  }
  errorMsg.phone = "";
  inputsValidity.phone = true;
  return true;
}
// verify if the address has only letters, numbers or space
function verifAddress(address) {
  if (!/^[A-Za-z0-9 ]+$/.test(address)) {
    errorMsg.address = "Wrong address (not special characters)";
    inputsValidity.address = false;
    return false;
  }
  errorMsg.address = "";
  inputsValidity.address = true;
  return true;
}
// verify if the zipcode has only numbers and 5 digits
function verifZipcode(zipcode) {
  if (!/^\d{5}$/.test(zipcode)) {
    errorMsg.zipcode = "Wrong Zip code (5 digits)";
    inputsValidity.zipcode = false;
    return false;
  }
  errorMsg.zipcode = "";
  inputsValidity.zipcode = true;
  return true;
}
// verify if the city has only letters or space
function verifCity(city) {
  if (!/^[A-Za-z ]+$/.test(city)) {
    errorMsg.city = "Wrong city";
    inputsValidity.city = false;
    return false;
  }
  errorMsg.city = "";
  inputsValidity.city = true;
  return true;
}
// verify if the country has only letters or space
function verifCountry(country) {
  if (!/^[A-Za-z ]+$/.test(country)) {
    errorMsg.country = "Wrong country";
    inputsValidity.city = false;
    return false;
  }
  errorMsg.country = "";
  inputsValidity.country = true;
  return true;
}
// set the emoney input to true if cash on delivery is selected. otherwise we verify the e-money inputs
function verifPaymentMethod(emoneyNumber, emoneyPin, paymentMethod) {
  if (paymentMethod === "eMoney") {
    verifEMoneyNumber(emoneyNumber);
    verifEMoneyPin(emoneyPin);
  } else {
    inputsValidity.emoneyNumber = true;
    inputsValidity.emoneyPin = true;
  }
}
// verify if the e-Money Number has only numbers and 9 digits
function verifEMoneyNumber(emoneyNumber) {
  if (!/^\d{9}$/.test(emoneyNumber)) {
    errorMsg.emoneyNumber = "Wrong e-money number (9 digits)";
    inputsValidity.emoneyNumber = false;
    return false;
  }
  errorMsg.emoneyNumber = "";
  inputsValidity.emoneyNumber = true;
  return true;
}
// verify if the e-Money Pin has only numbers and 4 digits
function verifEMoneyPin(emoneyPin) {
  if (!/^\d{4}$/.test(emoneyPin)) {
    errorMsg.emoneyPin = "Wrong e-money pin (4 digits)";
    inputsValidity.emoneyPin = false;
    return false;
  }
  errorMsg.emoneyPin = "";
  inputsValidity.emoneyPin = true;
  return true;
}
</script>
<template>
  <section class="checkout">
    <div class="checkout-container">
      <h3>checkout</h3>
      <form id="checkout-form">
        <div class="billing-detail">
          <p class="subtitle">billing details</p>
          <div class="input-container">
            <div class="input-group">
              <label for="name" :class="{ redLabel: errorMsg.name }"
                >Name</label
              >
              <p class="error-msg" v-if="errorMsg.name">{{ errorMsg.name }}</p>
              <input
                type="text"
                placeholder="Alexei Ward"
                name="name"
                id="name"
                autocomplete="off"
                v-model="name"
                :class="{ redInput: errorMsg.name }"
                @input="resetError"
              />
            </div>
            <div class="input-group">
              <label for="email" :class="{ redLabel: errorMsg.email }"
                >Email Address</label
              >
              <p class="error-msg" v-if="errorMsg.email">
                {{ errorMsg.email }}
              </p>
              <input
                type="text"
                placeholder="alexei@mail.com"
                name="email"
                id="email"
                autocomplete="off"
                v-model="email"
                :class="{ redInput: errorMsg.email }"
                @input="resetError"
              />
            </div>
            <div class="input-group">
              <label for="phone" :class="{ redLabel: errorMsg.phone }"
                >Phone Number</label
              >
              <p class="error-msg" v-if="errorMsg.phone">
                {{ errorMsg.phone }}
              </p>
              <input
                type="text"
                placeholder="+1 202-555-0136"
                name="phone"
                id="phone"
                autocomplete="off"
                v-model="phone"
                :class="{ redInput: errorMsg.phone }"
                @input="resetError"
              />
            </div>
          </div>
        </div>
        <div class="shipping-info">
          <p class="subtitle">shipping info</p>
          <div class="input-container">
            <div class="input-group address">
              <label for="address" :class="{ redLabel: errorMsg.address }"
                >Address</label
              >
              <p class="error-msg" v-if="errorMsg.address">
                {{ errorMsg.address }}
              </p>
              <input
                type="text"
                placeholder="1137 Williams Avenue"
                name="address"
                id="address"
                autocomplete="off"
                v-model="address"
                :class="{ redInput: errorMsg.address }"
                @input="resetError"
              />
            </div>
            <div class="input-group">
              <label for="zipcode" :class="{ redLabel: errorMsg.zipcode }"
                >ZIP code</label
              >
              <p class="error-msg" v-if="errorMsg.zipcode">
                {{ errorMsg.zipcode }}
              </p>
              <input
                type="text"
                placeholder="10001"
                name="zipcode"
                id="zipcode"
                autocomplete="off"
                v-model="zipcode"
                :class="{ redInput: errorMsg.zipcode }"
                @input="resetError"
              />
            </div>
            <div class="input-group">
              <label for="city" :class="{ redLabel: errorMsg.city }"
                >City</label
              >
              <p class="error-msg" v-if="errorMsg.city">
                {{ errorMsg.city }}
              </p>
              <input
                type="text"
                placeholder="New York"
                name="city"
                id="city"
                autocomplete="off"
                v-model="city"
                :class="{ redInput: errorMsg.city }"
                @input="resetError"
              />
            </div>
            <div class="input-group">
              <label for="country" :class="{ redLabel: errorMsg.country }"
                >City</label
              >
              <p class="error-msg" v-if="errorMsg.country">
                {{ errorMsg.country }}
              </p>
              <input
                type="text"
                placeholder="United States"
                name="country"
                id="country"
                autocomplete="off"
                v-model="country"
                :class="{ redInput: errorMsg.country }"
                @input="resetError"
              />
            </div>
          </div>
        </div>
        <div class="payment-detail">
          <p class="subtitle">payment details</p>
          <div class="payment-method">
            <legend>Payment Method</legend>
            <div class="input-group-radio">
              <div class="input-group">
                <input
                  type="radio"
                  id="eMoney"
                  name="paymentMethod"
                  value="eMoney"
                  v-model="paymentMethod"
                  checked
                />
                <label for="eMoney">e-Money</label>
              </div>
              <div class="input-group">
                <input
                  type="radio"
                  id="cashOnDelivery"
                  name="paymentMethod"
                  value="cashOnDelivery"
                  v-model="paymentMethod"
                />
                <label for="cashOnDelivery">Cash on Delivery</label>
              </div>
            </div>
          </div>
          <div v-show="paymentMethod === 'eMoney'" class="input-container">
            <div class="input-group">
              <label
                for="emoneyNumber"
                :class="{ redLabel: errorMsg.emoneyNumber }"
                >e-Money Number</label
              >
              <p class="error-msg" v-if="errorMsg.emoneyNumber">
                {{ errorMsg.emoneyNumber }}
              </p>
              <input
                type="text"
                placeholder="238521993"
                name="emoneyNumber"
                id="emoneyNumber"
                autocomplete="off"
                v-model="emoneyNumber"
                :class="{ redInput: errorMsg.emoneyNumber }"
                @input="resetError"
              />
            </div>
            <div class="input-group">
              <label for="country" :class="{ redLabel: errorMsg.emoneyPin }"
                >e-Money PIN</label
              >
              <p class="error-msg" v-if="errorMsg.emoneyPin">
                {{ errorMsg.emoneyPin }}
              </p>
              <input
                type="text"
                placeholder="6891"
                name="emoneyPin"
                id="emoneyPin"
                autocomplete="off"
                v-model="emoneyPin"
                :class="{ redInput: errorMsg.emoneyPin }"
                @input="resetError"
              />
            </div>
          </div>
          <div
            v-show="paymentMethod === 'cashOnDelivery'"
            class="cash-on-delivery"
          >
            <img
              src="/assets/checkout/icon-cash-on-delivery.svg"
              alt="Icone cash on delivery"
            />
            <p class="description">
              The ‘Cash on Delivery’ option enables you to pay in cash when our
              delivery courier arrives at your residence. Just make sure your
              address is correct so that your order will not be cancelled.
            </p>
          </div>
        </div>
      </form>
    </div>
    <div class="summary-container">
      <h6>summary</h6>
      <div
        class="summary-item"
        v-for="summaryItem in cartStore.getCart"
        :key="summaryItem"
      >
        <div class="summary-item-info">
          <img :src="`assets/cart/image-${summaryItem.slug}.jpg`" alt="" />
          <div class="summary-item-info-detail">
            <div class="summary-product-name">{{ summaryItem.name }}</div>
            <div class="summary-price">$ {{ summaryItem.price }}</div>
          </div>
        </div>
        <span class="summary-quantity">x{{ summaryItem.quantity }}</span>
      </div>
      <div class="summary-total-container">
        <div class="summary-total">
          <p class="summary-description">Total</p>
          <p class="summary-number">
            $
            {{
              cartStore.getTotal
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}
          </p>
        </div>
        <div class="summary-total">
          <p class="summary-description">Shipping</p>
          <p class="summary-number">$ 50</p>
        </div>
        <div class="summary-total">
          <p class="summary-description">VAT Included</p>
          <p class="summary-number">
            $
            {{
              cartStore.getVat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}
          </p>
        </div>
        <div class="summary-total">
          <p class="summary-description">Grand total</p>
          <p class="summary-number">
            $
            {{
              cartStore.getTotalWithVat
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}
          </p>
        </div>
      </div>
      <button class="btn-primary btn-summary" type="submit" @click="onSubmit">
        continue & pay
      </button>
      <CheckoutConfirmation :reveal="confirmationReveal"></CheckoutConfirmation>
    </div>
  </section>
</template>
<style scoped lang="scss">
.checkout {
  display: flex;
  position: relative;
  .checkout-container {
    background: #fff;
    width: 70%;
    border-radius: 8px;
    padding: 54px 30px 30px;
    margin-right: clamp(10px, 2.5vw, 30px);

    h3 {
      margin-bottom: 41px;
    }

    .subtitle {
      margin-bottom: 16px;
    }

    .billing-detail {
      margin-bottom: 30px;
    }

    .payment-method {
      margin-bottom: 15px;
    }

    .shipping-info {
      margin-bottom: 30px;
    }

    .input-container {
      display: flex;
      flex-wrap: wrap;

      .input-group {
        width: 50%;
        padding-right: 16px;
        margin-bottom: 24px;
        position: relative;

        label {
          font-weight: 700;
          font-size: 12px;
          line-height: 16px;
          letter-spacing: -0.214286px;
        }

        .redLabel {
          color: #cd2c2c;
        }

        .error-msg {
          position: absolute;
          top: 7px;
          right: 18px;
          font-weight: 500;
          font-size: 12px;
          line-height: 16px;
          letter-spacing: -0.214286px;
          color: #cd2c2c;
        }

        input {
          width: 100%;
          height: 56px;
          border: 1px solid #cfcfcf;
          border-radius: 8px;
          padding: 18px 24px;
          margin-top: 9px;
        }

        .redInput {
          border: 2px solid #cd2c2c;
        }

        input:focus {
          border: none;
          outline: 1px solid #d87d4a;
          caret-color: #d87d4a;
        }
      }
      .address {
        width: 100%;
      }
    }

    .payment-method {
      display: flex;
      legend {
        width: 50%;
        font-weight: 700;
        font-size: 12px;
        line-height: 16px;
        letter-spacing: -0.214286px;
      }
      .input-group-radio {
        width: 50%;
        padding-right: 16px;

        .input-group {
          width: 100%;
          height: 56px;
          border: 1px solid #cfcfcf;
          border-radius: 8px;
          padding: 18px 24px;
          display: flex;
          align-items: center;
          margin-bottom: 16px;

          &:hover {
            border: 1px solid #d87d4a;
          }

          input[type="radio"] {
            width: 15px;
            height: 15px;
            accent-color: #d87d4a;
            cursor: pointer;
          }

          label {
            margin-left: 21px;
            font-weight: 700;
            font-size: 14px;
            line-height: 19px;
            letter-spacing: -0.25px;
            cursor: pointer;
          }
        }
        .input-group:has(input:checked) {
          border: 1px solid #d87d4a;
        }
      }
    }
    .cash-on-delivery {
      display: flex;
      align-items: center;
      img {
        width: 48px;
        height: 48px;
        margin-right: 32px;
      }
    }
  }
  .summary-container {
    background: #fff;
    width: 30%;
    height: fit-content;
    border-radius: 8px;
    padding: 30px;

    h6 {
      margin-bottom: 31px;
    }

    .summary-item {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .summary-item-info {
        width: 100%;
        display: flex;
        align-items: center;
        img {
          width: 64px;
          height: 64px;
          border-radius: 8px;
        }
        .summary-item-info-detail {
          margin-left: 16px;
          .summary-product-name {
            font-weight: 700;
            font-size: 15px;
            line-height: 25px;
          }
          .summary-price {
            font-weight: 700;
            font-size: 14px;
            line-height: 25px;
            color: #000000;
            mix-blend-mode: normal;
            opacity: 0.5;
          }
        }
      }
      .summary-quantity {
        font-weight: 700;
        font-size: 15px;
        line-height: 25px;
        text-align: right;
        color: #000000;
        mix-blend-mode: normal;
        opacity: 0.5;
      }
    }
    .summary-item:not(:last-child) {
      margin-bottom: 24px;
    }
    .summary-total-container {
      width: 100%;
      margin-bottom: 32px;
      .summary-total {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
        .summary-description {
          font-weight: 500;
          font-size: 15px;
          line-height: 25px;
          color: #000000;
          mix-blend-mode: normal;
          text-transform: uppercase;
          opacity: 0.5;
        }
        .summary-number {
          font-weight: 700;
          font-size: 18px;
          line-height: 25px;
          text-align: center;
          text-transform: uppercase;
        }
      }
      .summary-total:last-child {
        margin-top: 24px;
        .summary-number {
          color: #d87d4a;
        }
      }
    }
    .btn-summary {
      display: block;
      width: 100%;
      text-align: center;
    }
  }
}
@media (max-width: 850px) {
  .checkout {
    flex-direction: column;
    .checkout-container {
      width: 100%;
      margin-bottom: 32px;
    }
    .summary-container {
      width: 100%;
    }
  }
}

@media (max-width: 500px) {
  .checkout {
    .checkout-container {
      padding: 24px 24px 0;
      h3 {
        margin-bottom: 32px;
      }
      .input-container {
        flex-direction: column;
        .input-group {
          width: 100%;
          padding-right: 0;
        }
      }
      .payment-method {
        flex-direction: column;
        legend {
          margin-bottom: 9px;
        }
        .input-group-radio {
          width: 100%;
        }
      }
      .cash-on-delivery {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
