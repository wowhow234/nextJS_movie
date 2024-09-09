"use client";

import { useState } from "react";

// export const metadata = {
//   title: "회원가입",
// };

type Input = {
  id: string;
  nickname: string;
  password: string;
  passwordcheck: string;
};

export default function SignUp() {
  const [inputs, setInputs] = useState({
    id: "",
    nickname: "",
    password: "",
    passwordcheck: "",
  });

  const onChangeInput = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    alert("회원가입이 완료되었습니다.");
  };

  return (
    <form onSubmit={onSubmitForm}>
      <h1> 회원가입 페이지</h1>;<label>ID</label>
      <input type="text" name="id" value={inputs.id} onChange={onChangeInput} />
      <label>nickname</label>
      <input
        type="text"
        name="nickname"
        value={inputs.nickname}
        onChange={onChangeInput}
      />
      <label>password</label>
      <input
        type="password"
        name="password"
        value={inputs.password}
        onChange={onChangeInput}
      />
      <label>password check</label>
      <input
        type="password"
        name="passwordcheck"
        value={inputs.passwordcheck}
        onChange={onChangeInput}
      />
      <button>회원가입</button>
    </form>
  );
}
