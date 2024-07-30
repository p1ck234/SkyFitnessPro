export default function SignIn() {
  return (
    <div>
      <form>
        
        <h1>Вход</h1>

        <input name="email" type="text" placeholder="Логин"></input>

        <input name="password" type="password" placeholder="Пароль"></input>

        <button>Войти</button>

        <button>Зарегистрироваться</button>

      </form>
    </div>
  );
}
