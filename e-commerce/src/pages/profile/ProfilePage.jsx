import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../utils/authProvider.js";
import { getUser, updateUSer } from "../../api/fetchers/user.js";
import useQueryCustom from "../../hooks/useQueryCustom.js";
import {
  Container,
  Wrapper,
  Text,
  Description,
  LineSpacer,
  Spacer,
  Flex,
  Column,
  Input,
  Group,
  Form,
  Button as ButtonStyled,
  Span,
} from "./styled";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const [isShowChange, setIsShowChange] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const auth = useAuth();
  const ref = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { isLoading, data, refetch } = useQueryCustom(["GET_USER"], () =>
    getUser(auth.user.userId)
  );

  useEffect(() => {
    if (data) {
      setDataUpdate({
        name: data.data.name,
        email: data.data.email,
        phone: data.data.phone,
      });
    }
  }, [data]);

  const onSubmit = async (dataForm) => {
    const format =
      /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{6,}/;
    const { name, password, confirmPassword } = dataForm;
    const form = new FormData();
    form.append("email", data.data.email);
    form.append("phone", data.data.phone);
    form.append("role", data.data.role.id);
    form.append("name", name);
    if (password !== confirmPassword) {
      ref.current.innerText = "Password and Confirm Password not match";
    } else if (!password.match(format)) {
      ref.current.innerText =
        "Password must contain uppercase lowercase letters, special characters, numbers";
    } else {
      form.append("password", password);
      const response = await updateUSer(auth.user.userId, form);
      if (response.data.status !== "OK") {
        toast.error("Có lỗi !");
      } else {
        ref.current.innerText = "";
        toast.success("Đổi thông tin thành công!");
        refetch();
        setIsShowChange(false);
      }
    }
  };

  if (isLoading) return;
  return (
    <Container>
      <Wrapper>
        <Text variant="h2">Hồ Sơ Của Tôi</Text>
        <Description>Quản lý thông tin hồ sơ để bảo mật tài khoản</Description>
        <Spacer margin="10px 0 0"></Spacer>
        <LineSpacer width="inherit" height="1"></LineSpacer>
        <Spacer margin="40px 0 0"></Spacer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Flex>
            <Column flex="6">
              <Group>
                <div>
                  <label>Tên</label>
                </div>
                <Input
                  {...register("name", { required: true })}
                  placeholder="Tên"
                  value={dataUpdate.name}
                  disabled={!isShowChange}
                  onChange={(e) =>
                    setDataUpdate({ ...dataUpdate, name: e.target.value })
                  }
                />
              </Group>
              <Group>
                <div>
                  <label>Email</label>
                </div>
                <Input
                  placeholder="Email"
                  value={dataUpdate.email}
                  disabled
                  onChange={(e) =>
                    setDataUpdate({ ...dataUpdate, email: e.target.value })
                  }
                />
              </Group>
              <Group>
                <div>
                  <label>SDT</label>
                </div>
                <Input
                  placeholder="Số Điện Thoại"
                  value={dataUpdate.phone}
                  disabled
                  onChange={(e) =>
                    setDataUpdate({ ...dataUpdate, phone: e.target.value })
                  }
                />
              </Group>
              {isShowChange ? (
                <>
                  <Group>
                    <div>
                      <label>Mật khẩu mới</label>
                    </div>
                    <Input
                      type={"password"}
                      placeholder="Mật khẩu mới"
                      {...register("password", {
                        required: true,
                        minLength: 6,
                        maxLength: 12,
                      })}
                    />
                  </Group>
                  <Group>
                    <div>
                      <label>Xác nhận mật khẩu</label>
                    </div>
                    <Input
                      type={"password"}
                      placeholder="Xác nhận mật khẩu"
                      {...register("confirmPassword", { required: true })}
                    />
                  </Group>
                </>
              ) : null}
              <Group>
                {errors.password?.type === "required" && (
                  <span className="message">Field password is required.</span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="message">
                    Field password is at least 6 characters.
                  </span>
                )}
                {errors.password?.type === "maxLength" && (
                  <span className="message">
                    Field password is at longest 12 characters.
                  </span>
                )}
                {errors.confirmPassword && (
                  <span className="message">
                    Field confirm password is required.
                  </span>
                )}
                <span className="message" ref={ref}></span>
              </Group>
              {!isShowChange ? (
                <>
                  <Span onClick={() => setIsShowChange(true)}>
                    Chỉnh sửa thông tin
                  </Span>
                </>
              ) : (
                <>
                  <ButtonStyled>Lưu</ButtonStyled>
                  <Span
                    onClick={() => {
                      setIsShowChange(false);
                    }}
                  >
                    Hủy bỏ
                  </Span>
                </>
              )}
            </Column>
            <LineSpacer width="1" height="200"></LineSpacer>
            <Column flex="1">
              <Spacer margin="0 40px 0 0"></Spacer>
              <Flex>
                <Column>
                  <div className="img">
                    <img
                      src="data:image/jpeg;base64,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"
                      alt=""
                    />
                  </div>
                </Column>
              </Flex>
            </Column>
          </Flex>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default ProfilePage;
