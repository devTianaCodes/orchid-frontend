type CareTopic = {
  title: string;
  imageUrl: string;
  imageAlt: string;
  summary: string;
  likes: string[];
  avoids: string[];
};

const careTopics: CareTopic[] = [
  {
    title: "Watering",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/04/Orchid_-_Phalaenopsis_%2849591245677%29.jpg",
    imageAlt: "Potted Phalaenopsis orchid showing healthy roots and drainage needs.",
    summary:
      "Water when the potting mix is nearly dry and the roots look silvery, then let extra water drain away completely.",
    likes: ["Room-temperature water", "A clear wet-dry rhythm", "Free drainage after watering"],
    avoids: ["Standing water", "Constantly soggy bark", "Water trapped in the crown"],
  },
  {
    title: "Light",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Cattleya_labiata_Orchi_1013.jpg",
    imageAlt: "Purple Cattleya orchid flower in bright natural light.",
    summary:
      "Most indoor orchids grow best in bright indirect light, close to a window but protected from harsh midday sun.",
    likes: ["Bright filtered light", "Morning or late-day sun", "Steady placement"],
    avoids: ["Hot direct sun", "Dark corners", "Frequent light changes"],
  },
  {
    title: "Humidity",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/f/f8/Biltmore_Greenhouse_-_Orchid.jpg",
    imageAlt: "Orchid growing in a greenhouse-like humid environment.",
    summary:
      "Orchids appreciate humidity around their roots and leaves, but they still need gentle airflow to stay healthy.",
    likes: ["Moderate humidity", "Air movement", "Humidity trays or grouped plants"],
    avoids: ["Closed stale air", "Wet leaves overnight", "Drafty temperature swings"],
  },
  {
    title: "Potting Mix",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/e/ee/Tiesto_transparente_phalaenopsis.JPG",
    imageAlt: "Transparent Phalaenopsis pot showing orchid roots and potting medium.",
    summary:
      "Use an airy orchid mix such as bark, moss, charcoal, or mineral material so roots can breathe between waterings.",
    likes: ["Chunky bark or moss blends", "Air around roots", "A pot with drainage"],
    avoids: ["Dense garden soil", "Compacted old mix", "Oversized wet pots"],
  },
  {
    title: "Feeding",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/e/e4/Fertilizers_for_Orchids_NPK_4-6-7.png",
    imageAlt: "Orchid fertilizer packaging showing NPK feeding information.",
    summary:
      "Feed lightly during active growth, especially when new leaves and roots are forming, and reduce feeding during rest periods.",
    likes: ["Diluted orchid fertilizer", "Feeding after watering", "Less food in winter rest"],
    avoids: ["Strong fertilizer doses", "Feeding dry roots", "Feeding stressed plants heavily"],
  },
  {
    title: "Repotting",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/f/fd/Orchid_-_Phalaenopsis_%2849542028821%29.jpg",
    imageAlt: "Phalaenopsis orchid roots and pot structure for repotting.",
    summary:
      "Repot when the bark breaks down, the pot no longer drains well, or healthy roots have clearly outgrown the container.",
    likes: ["Fresh airy medium", "Gentle root handling", "A pot only slightly larger"],
    avoids: ["Repotting during bloom", "Cutting healthy roots", "Burying the crown"],
  },
  {
    title: "Propagation",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/87/Phalaenopsis_keiki.jpg",
    imageAlt: "Young Phalaenopsis keiki growing from an orchid stem.",
    summary:
      "Beginner-friendly propagation usually means waiting for a natural keiki or dividing mature orchids that are large enough.",
    likes: ["Healthy parent plants", "Keikis with strong roots", "Division only when mature"],
    avoids: [
      "Forcing weak plants",
      "Separating tiny keikis too early",
      "Propagation during stress",
    ],
  },
];

export function CareGuidePage() {
  return (
    <>
      <section className="rounded-lg bg-mist p-5 shadow-sm sm:p-6">
        <p className="text-sm font-medium uppercase tracking-wide text-bark">Care Guide</p>
        <h1 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">Orchid Care Guide</h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-ink/80">
          Learn the essential habits for watering, light, humidity, potting, feeding, repotting, and
          propagation.
        </p>
      </section>

      <section aria-label="Orchid care topics">
        <ul className="flex flex-col gap-5">
          {careTopics.map((topic, index) => (
            <li key={topic.title} className="overflow-hidden rounded-lg bg-mist shadow-sm">
              <div className="grid min-h-[24rem] gap-0 lg:grid-cols-2">
                <div
                  className={`min-h-72 overflow-hidden bg-peony/40 lg:min-h-full ${
                    index % 2 === 0 ? "order-1" : "order-2"
                  }`}
                >
                  <img
                    src={topic.imageUrl}
                    alt={topic.imageAlt}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div
                  className={`flex flex-col justify-center gap-5 p-5 sm:p-7 lg:p-8 ${
                    index % 2 === 0 ? "order-2" : "order-1"
                  }`}
                >
                  <div>
                    <h2 className="text-3xl font-bold text-ink">{topic.title}</h2>
                    <p className="mt-3 text-base leading-7 text-ink/80">{topic.summary}</p>
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
    <div>
      <h3 className="text-sm font-bold uppercase tracking-wide text-bark">{title}</h3>
      <ul className="mt-2 space-y-2 text-sm leading-6 text-ink/80">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
