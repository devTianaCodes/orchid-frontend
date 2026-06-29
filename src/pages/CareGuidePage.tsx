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
      "https://upload.wikimedia.org/wikipedia/commons/5/59/Phalaenopsis_amabilis_Orchi_198.jpg",
    imageAlt: "White Phalaenopsis orchid flowers with healthy green leaves.",
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
      "https://upload.wikimedia.org/wikipedia/commons/f/f1/Vanda_coerulea_-_Blue_Orchid_-_Kew.jpg",
    imageAlt: "Blue Vanda orchid flowers in a humid greenhouse setting.",
    summary:
      "Orchids appreciate humidity around their roots and leaves, but they still need gentle airflow to stay healthy.",
    likes: ["Moderate humidity", "Air movement", "Humidity trays or grouped plants"],
    avoids: ["Closed stale air", "Wet leaves overnight", "Drafty temperature swings"],
  },
  {
    title: "Potting Mix",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Phalaenopsis_roots.jpg",
    imageAlt: "Phalaenopsis orchid roots showing thick aerial root growth.",
    summary:
      "Use an airy orchid mix such as bark, moss, charcoal, or mineral material so roots can breathe between waterings.",
    likes: ["Chunky bark or moss blends", "Air around roots", "A pot with drainage"],
    avoids: ["Dense garden soil", "Compacted old mix", "Oversized wet pots"],
  },
  {
    title: "Feeding",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/7/7b/Dendrobium_nobile_-_Curtis%27_90_%28Ser._3_no._20%29_pl._5470_%281864%29.jpg",
    imageAlt: "Illustration of Dendrobium nobile orchid growth and flowers.",
    summary:
      "Feed lightly during active growth, especially when new leaves and roots are forming, and reduce feeding during rest periods.",
    likes: ["Diluted orchid fertilizer", "Feeding after watering", "Less food in winter rest"],
    avoids: ["Strong fertilizer doses", "Feeding dry roots", "Feeding stressed plants heavily"],
  },
  {
    title: "Repotting",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/2/20/Phalaenopsis_schilleriana_-_roots.jpg",
    imageAlt: "Phalaenopsis orchid roots ready for repotting.",
    summary:
      "Repot when the bark breaks down, the pot no longer drains well, or healthy roots have clearly outgrown the container.",
    likes: ["Fresh airy medium", "Gentle root handling", "A pot only slightly larger"],
    avoids: ["Repotting during bloom", "Cutting healthy roots", "Burying the crown"],
  },
  {
    title: "Propagation",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Keiki_of_Phalaenopsis.jpg",
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
        <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {careTopics.map((topic) => (
            <li key={topic.title} className="overflow-hidden rounded-lg bg-mist shadow-sm">
              <div className="grid h-full gap-0 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:grid-cols-1 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
                <div className="aspect-[4/3] overflow-hidden bg-peony/40 md:aspect-auto lg:aspect-[4/3] xl:aspect-auto">
                  <img
                    src={topic.imageUrl}
                    alt={topic.imageAlt}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-col gap-4 p-5">
                  <div>
                    <h2 className="text-2xl font-bold text-ink">{topic.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-ink/80">{topic.summary}</p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
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
