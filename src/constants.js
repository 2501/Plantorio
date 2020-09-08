export const ITEM_CATALOGUE = {
  SEEDS: {
    AMARANTH: {
      name: "Amaranth",
      category: "SEEDS",
      description: "A simple, fast-growing crop.",
      cost: 25,
      needs: {
        daily: {
          water: 1
        },
        total: {
          age: 2
        }
      }
    },
    BEET: {
      name: "Beet",
      category: "SEEDS",
      description: "A thirstier, more profitable crop.",
      cost: 100,
      needs: {
        daily: {
          water: 2
        },
        total: {
          age: 4
        }
      }
    }
  },
  MACHINES: {
    SPRINKLER_MK_1: {
      name: "Sprinkler Mk 1",
      category: "MACHINES",
      description: "A simple sprinlker which waters plants around it.",
      cost: 500
    }
  }
}
