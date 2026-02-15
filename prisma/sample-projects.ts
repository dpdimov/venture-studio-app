import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.findFirst({ where: { isAdmin: true } });
  if (!admin) {
    console.error("No admin user found. Run seed first.");
    process.exit(1);
  }

  const project1 = await prisma.project.create({
    data: {
      title: "EcoTrack",
      shortDescription:
        "A mobile app helping university students track and reduce their carbon footprint through gamified daily challenges and peer accountability.",
      problem:
        "University students want to live more sustainably but lack awareness of their daily environmental impact. Existing carbon tracking tools are complex, boring, and not designed for student lifestyles.",
      solution:
        "EcoTrack gamifies carbon footprint reduction with bite-sized daily challenges tailored to student life — from meal choices to transport habits. Students earn points, compete with friends, and unlock rewards from local sustainable businesses.",
      product:
        "A mobile app (iOS & Android) with daily challenge notifications, a carbon dashboard, social leaderboards, and a rewards marketplace. Integration with university meal plans and transport systems for automatic tracking.",
      advantage:
        "Purpose-built for students (not generic consumers), partnerships with university sustainability offices, and a social-first design that leverages peer influence — the strongest driver of behaviour change in 18-25 year olds.",
      market:
        "2.3 million university students in the UK. The sustainable living app market is projected to reach $1.2B by 2027. Our initial target: 50,000 students across 10 Russell Group universities in Year 1.",
      vision:
        "To become the default sustainability companion for every university student in the UK, expanding to European universities by Year 3 and corporate graduate programmes by Year 5.",
      team:
        "Sarah Chen (CEO) — MSc Environmental Science, former sustainability officer at Bristol SU. James Okafor (CTO) — Computer Science final year, previously interned at Monzo. Priya Sharma (Design) — Product Design graduate, UX researcher at a climate tech startup.",
      funding:
        "Seeking £75,000 pre-seed to fund MVP development, university pilot partnerships, and initial marketing. Previous: £10,000 university enterprise award.",
      nextMilestone:
        "Launch pilot with 500 students at the University of Bath by September 2026. Validate engagement metrics (daily active users, challenge completion rate) to support seed round.",
      video: { id: "dQw4w9WgXcQ", source: "youtube" },
      isVisible: true,
      surveyEnabled: true,
      createdById: admin.id,
    },
  });

  const project2 = await prisma.project.create({
    data: {
      title: "StudySpace",
      shortDescription:
        "An AI-powered platform that matches students with available study spaces across campus in real-time, reducing overcrowding and wasted time searching for seats.",
      problem:
        "Students waste an average of 25 minutes per day searching for available study spaces, especially during exam periods. Libraries fill up by 9am, and there is no reliable way to know where free desks are without physically checking.",
      solution:
        "StudySpace uses occupancy sensors and Wi-Fi analytics to provide real-time availability data for every study space on campus. Students open the app, see a live heatmap, and can reserve a spot or get notified when their preferred space frees up.",
      product:
        "A web app with live campus map showing study space availability, reservation system, quiet hours scheduling, and group study room booking. Admin dashboard for university estates teams to monitor utilisation patterns.",
      advantage:
        "Unlike generic room booking systems, StudySpace provides real-time occupancy data (not just bookings), works with existing university Wi-Fi infrastructure (no hardware needed for MVP), and is designed specifically for informal study spaces — not just bookable rooms.",
      market:
        "165 UK universities managing over 50,000 study spaces. Annual campus estate management budgets average £2-5M per university. Secondary market: co-working spaces and public libraries facing similar challenges.",
      vision:
        "To optimise how every physical space in education is used — starting with study spaces, expanding to labs, lecture theatres, and eventually becoming the space management layer for smart campuses worldwide.",
      team:
        "Alex Drummond (CEO) — MBA candidate, 4 years at a proptech startup. Maria Santos (CTO) — PhD in IoT Systems, published researcher in smart building technology. Tom Wright (Operations) — Former university estates manager with 8 years of experience.",
      funding:
        "Seeking £120,000 seed to fund sensor deployment at pilot universities, platform development, and sales team. Previous: £25,000 Innovate UK Smart Grant.",
      nextMilestone:
        "Complete paid pilot with University of Bath estates team (Q1 2026). Target: demonstrate 15% improvement in space utilisation to justify campus-wide rollout.",
      isVisible: true,
      surveyEnabled: true,
      createdById: admin.id,
    },
  });

  console.log("Sample projects created:");
  console.log(`  - ${project1.title} (ID: ${project1.id})`);
  console.log(`  - ${project2.title} (ID: ${project2.id})`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
