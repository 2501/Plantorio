# Plantorio
A simple plant-growing homage to Factorio.

# Core Concept
Seeking a better future, you bought a greenhousing asteroid near the orbit of Jupiter, critical to feeding the outer system. When you arrived, however, you found little equipment and all the seeds mis-labeled. At least the shipping drones still visit! Time to literally grow a fortune.

# Features
- Grow plants manually at first, such as water each day and harvesting by hand
- As you sell plants, earn money to purchase new machines, seeds, and upgrades
- Increasingly automate your greenhouse and expand to crops needing fertilization and sun lamps
- Expand your greenhouse with further upgrades!

# "Engine"
- One game tick is one day, advanced by button click. On each tick:
  - Apply machine effects (watering, fertilizing, auto-harvesting)
  - Check plants against their needs to see if they:
    - Grow: Conditions correct, or even optimal. Advance growth one step.
    - Wilt: Conditions incorrect (be it too much or too little). Add "Wilted" flag.
    - Rot:  Has "wilted" flag and incorrect conditions (or "wilting" twice). Plant dies; remains must be (manually?) removed to plant another.
  - Then advance to the next day.

- Each Greenhouse Tile can contain a plant, a machine, or nothing.
  - Greenhouse is a 2D array, which can be expanded. 0,0 == top-left.
  - When a plant is sold, money is instantly added to the player.
- Plants:
  - Not realistic, but abstractions given names. Progress "down" the alphabet for simplicity. Thus, Amaranth is simplest to grow (needing only water and growing quickly, but making little money) and Quinoa is fickle, but can be accelerated with sun lamps and makes a fortune.
- Money & Upgrades:
  - As you earn money, you can buy new seed lots to unlock new plants. You can also purchase the licenses for, and then copies of various helpful machines.
