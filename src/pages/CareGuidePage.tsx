import orchidFertiliserCareImage from "../assets/orchid-fertiliser-care.png";
import orchidPropagationCareImage from "../assets/orchid-propagation-care.png";

type CareTopic = {
  eyebrow: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
  summary: string;
  detail: string;
  cue: string;
  likes: string[];
  avoids: string[];
};

const careTopics: CareTopic[] = [
  {
    eyebrow: "Beginner Care",
    title: "Watering",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/04/Orchid_-_Phalaenopsis_%2849591245677%29.jpg",
    imageAlt: "Potted Phalaenopsis orchid showing healthy roots and drainage needs.",
    summary:
      "Water when the potting mix is nearly dry and the roots look silvery, then let extra water drain away completely.",
    detail:
      "A good watering session should reach the whole root zone, not just the surface. Let water run through the pot, wait until dripping slows, and return the orchid to its decorative cover only when the base is no longer holding extra water.",
    cue: "Beginner cue: green roots usually mean wait; silvery roots usually mean it is time to check the pot.",
    likes: ["Room-temperature water", "A clear wet-dry rhythm", "Free drainage after watering"],
    avoids: ["Standing water", "Constantly soggy bark", "Water trapped in the crown"],
  },
  {
    eyebrow: "Light",
    title: "Light",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Cattleya_labiata_Orchi_1013.jpg",
    imageAlt: "Purple Cattleya orchid flower in bright natural light.",
    summary:
      "Most indoor orchids grow best in bright indirect light, close to a window but protected from harsh midday sun.",
    detail:
      "Leaves tell the story. Healthy light often gives firm medium-green leaves and steady root growth. Very dark leaves can mean the plant wants more light, while yellow patches or dry sunken marks can mean the sun is too direct.",
    cue: "Beginner cue: if your hand casts a soft shadow near the plant, the light is often close to ideal.",
    likes: ["Bright filtered light", "Morning or late-day sun", "Steady placement"],
    avoids: ["Hot direct sun", "Dark corners", "Frequent light changes"],
  },
  {
    eyebrow: "Growing Climate",
    title: "Humidity",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/f/f8/Biltmore_Greenhouse_-_Orchid.jpg",
    imageAlt: "Orchid growing in a greenhouse-like humid environment.",
    summary:
      "Orchids appreciate humidity around their roots and leaves, but they still need gentle airflow to stay healthy.",
    detail:
      "Humidity helps buds, leaves, and aerial roots stay active, especially in heated rooms. The goal is not a sealed wet environment; it is a fresh, lightly humid space where moisture can evaporate during the day.",
    cue: "Beginner cue: dry crispy root tips can point to low humidity, while spots and stale smells point to too little airflow.",
    likes: ["Moderate humidity", "Air movement", "Humidity trays or grouped plants"],
    avoids: ["Closed stale air", "Wet leaves overnight", "Drafty temperature swings"],
  },
  {
    eyebrow: "Root Health",
    title: "Potting Mix",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/e/ee/Tiesto_transparente_phalaenopsis.JPG",
    imageAlt: "Transparent Phalaenopsis pot showing orchid roots and potting medium.",
    summary:
      "Use an airy orchid mix such as bark, moss, charcoal, or mineral material so roots can breathe between waterings.",
    detail:
      "Most common orchids are not grown like ordinary houseplants. Their roots need pockets of air, so the mix should hold some moisture while still staying open. Bark dries faster, moss holds more water, and many plants enjoy a balanced blend.",
    cue: "Beginner cue: if the pot stays wet for many days and feels heavy, the mix may be too dense or broken down.",
    likes: ["Chunky bark or moss blends", "Air around roots", "A pot with drainage"],
    avoids: ["Dense garden soil", "Compacted old mix", "Oversized wet pots"],
  },
  {
    eyebrow: "Nutrition",
    title: "Feeding",
    imageUrl: orchidFertiliserCareImage,
    imageAlt: "Orchid fertiliser bottles beside blooming orchids.",
    summary:
      "Feed lightly during active growth, especially when new leaves and roots are forming, and reduce feeding during rest periods.",
    detail:
      "Orchids usually prefer weak, regular feeding rather than rare strong doses. Fertilizer supports new growth, but it cannot fix poor roots, bad light, or overwatering. Flush the pot with plain water sometimes so salts do not build up.",
    cue: "Beginner cue: feed most when you see new roots or leaves; pause or reduce when the plant is resting.",
    likes: ["Diluted orchid fertilizer", "Feeding after watering", "Less food in winter rest"],
    avoids: ["Strong fertilizer doses", "Feeding dry roots", "Feeding stressed plants heavily"],
  },
  {
    eyebrow: "Maintenance",
    title: "Repotting",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/f/fd/Orchid_-_Phalaenopsis_%2849542028821%29.jpg",
    imageAlt: "Phalaenopsis orchid roots and pot structure for repotting.",
    summary:
      "Repot when the bark breaks down, the pot no longer drains well, or healthy roots have clearly outgrown the container.",
    detail:
      "Repotting is less about giving a huge pot and more about refreshing the root environment. Remove old collapsed mix, trim only dead hollow roots, and settle the plant firmly so new roots can anchor into fresh material.",
    cue: "Beginner cue: sour smell, crumbling bark, or roots circling tightly around the pot are signs to repot.",
    likes: ["Fresh airy medium", "Gentle root handling", "A pot only slightly larger"],
    avoids: ["Repotting during bloom", "Cutting healthy roots", "Burying the crown"],
  },
  {
    eyebrow: "New Growth",
    title: "Propagation",
    imageUrl: orchidPropagationCareImage,
    imageAlt: "Parent orchid plant connected to a young propagated orchid plant.",
    summary:
      "Beginner-friendly propagation usually means waiting for a natural keiki or dividing mature orchids that are large enough.",
    detail:
      "Propagation works best when the parent plant is strong. A keiki should stay attached until it has several roots of its own, and divisions should keep enough healthy growth to recover. Rushing this step often weakens both plants.",
    cue: "Beginner cue: wait for a baby plant to have multiple roots before separating it.",
    likes: ["Healthy parent plants", "Keikis with strong roots", "Division only when mature"],
    avoids: [
      "Forcing weak plants",
      "Separating tiny keikis too early",
      "Propagation during stress",
    ],
  },
];

const defaultCareImageClassName =
  "h-full w-full object-cover transition duration-300 hover:scale-105";

export function CareGuidePage() {
  return (
    <>
      <section className="rounded-lg bg-mist p-5 shadow-sm sm:p-6">
        <p className="text-sm font-medium uppercase tracking-wide text-bark">Care Guide</p>
        <p className="mt-3 text-base leading-7 text-ink/80">
          Learn the essential habits for watering, light, humidity, potting, feeding, repotting, and
          propagation.
        </p>
      </section>

      <section aria-label="Orchid care topics">
        <ul className="flex flex-col gap-5">
          {careTopics.map((topic, index) => (
            <li key={topic.title} className="overflow-hidden rounded-lg bg-mist shadow-sm">
              <div className="grid min-h-[26rem] gap-0 lg:grid-cols-2">
                <div
                  className={`min-h-80 overflow-hidden bg-peony/40 lg:min-h-full ${
                    index % 2 === 0 ? "order-1" : "order-2"
                  }`}
                >
                  <img
                    src={topic.imageUrl}
                    alt={topic.imageAlt}
                    className={defaultCareImageClassName}
                  />
                </div>

                <div
                  className={`flex flex-col justify-center gap-6 p-5 sm:p-7 lg:p-9 ${
                    index % 2 === 0 ? "order-2" : "order-1"
                  }`}
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-bark">
                      {topic.eyebrow}
                    </p>
                    <h2 className="mt-2 text-3xl font-bold leading-tight text-ink">
                      {topic.title}
                    </h2>
                    <p className="mt-4 text-lg font-semibold leading-7 text-ink/85">
                      {topic.summary}
                    </p>
                    <p className="mt-3 text-base leading-7 text-ink/80">{topic.detail}</p>
                    <p className="mt-5 rounded-md bg-white/70 px-4 py-3 text-sm font-semibold leading-6 text-bark shadow-sm">
                      {topic.cue}
                    </p>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <CareList title="They like" items={topic.likes} />
                    <CareList title="Avoid" items={topic.avoids} />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

type CareListProps = {
  title: string;
  items: string[];
};

function CareList({ title, items }: CareListProps) {
  return (
    <div className="rounded-md bg-white/55 p-4">
      <h3 className="text-sm font-bold uppercase tracking-wide text-bark">{title}</h3>
      <ul className="mt-2 space-y-2 text-sm leading-6 text-ink/80">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
