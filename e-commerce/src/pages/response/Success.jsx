import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { runFireworks } from "../../utils/runFireworks";
import useQueryCustom from "../../hooks/useQueryCustom";
import "./style.css";
import { thunkCartTypes } from "../../constants/thunkTypes";
import { getCartByUser } from "../../api/fetchers/cart";
import { useAuth } from "../../utils/authProvider";
import { createBillByUser } from "../../api/fetchers/user";

const Success = () => {
  const { isLoading, data } = useQueryCustom(
    thunkCartTypes.GET_CART_USER,
    getCartByUser
  );
  const auth = useAuth();
  useEffect(() => {
    const fetch = async () => {
      if (data.data) {
        let listProduct = data.data.reduce(
          (acc, value) => [
            ...acc,
            { id: value.productId, quantity: value.amount },
          ],
          []
        );
        const form = {
          paymentMethod: "Paypal",
          payDate: Date.now(),
          items: listProduct,
        };
        const { data: dataRes } = await createBillByUser(auth.user.userId, form);
      }
    };
    fetch();
    document.querySelector("footer").style.display = "none";
    runFireworks();
    return () => {
      document.querySelector("footer").style.display = "block";
    };
  }, [isLoading]);

  if(isLoading) {
    return
  }

  return (
    <div className="success-wrapper">
      <div className="success">
        <h2>Cảm ơn bãn đã mua sản phẩm của chúng tôi!</h2>
        <p className="email-msg">
          Chúng tôi đã gửi hóa đơn đến email.Vui lòng kiểm tra email.
        </p>
        <p className="description">
          Nếu bạn có câu hỏi gì, liên hệ chúng toi
          <a className="email" href="mailto:order@example.com">
            order@example.com
          </a>
        </p>
        <Link to={"/product"}>
          <button type="button" width="300px" className="btnn">
            Tiếp tục mua sắm
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
