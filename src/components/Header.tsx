import {useCurrency} from "@/pages/_app";

function Header() {
  const { currency, setCurrency} = useCurrency()

  return (
    <div>
      <div className="header">
        <a href={"/"}>
          <h1 className="title">
            Trip Planner <em>by Alexandra Iakovi Varvouzou</em>
          </h1>
        </a>

        <nav>
          <div className="currency-dropdown">
            <label htmlFor="currency">Currency: </label>
            <select
              id="currency"
              value={currency}
              onChange={e => setCurrency(e.target.value as 'usd' | 'eur')}
            >
              <option value="usd">USD</option>
              <option value="eur">EUR</option>
            </select>
          </div>
        </nav>
      </div>
      <div style={{height: 60}}/>
    </div>
  )
}

export default Header;
