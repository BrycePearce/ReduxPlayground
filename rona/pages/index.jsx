import CountrySelector from "../components/CountrySelector";
import Stats from "../components/Stats";

import "normalize.css";

export default function IndexPage() {
  return (
    <div>
      <Stats url="https://covid19.mathdro.id/api"></Stats>
      <CountrySelector></CountrySelector>
    </div>
  );
}
