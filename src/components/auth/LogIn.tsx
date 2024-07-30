export function SignUp()  {
  return (
    <div>
      <form>
        
        <h1>Регистрация</h1>

        <input name="name" type="email" placeholder="Эл. почта"></input>

        <input name="password" type="password" placeholder="Пароль"></input>

        <input name="password" type="password" placeholder="Повторите пароль"></input>

        <button>Зарегистрироваться</button>

        <button>Войти</button>

      </form>
    </div>
  );
}
