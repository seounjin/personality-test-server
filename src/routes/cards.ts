import { CustomRoute, METHOD, DBField, Card } from "../types";
import { readDB } from "../db/dbController";

const getCards = (): Card[] => readDB(DBField.CARDS);

const cardsRoute: CustomRoute[] = [
  {
    method: METHOD.GET,
    route: "/api/v1/cards",
    handler: (req, res) => {
      const msgs = getCards();
      return res.status(200).json({ cards: msgs });
    },
  },
];

export default cardsRoute;
