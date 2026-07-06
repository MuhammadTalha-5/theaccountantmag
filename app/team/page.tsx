import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import TeamMemberCard from "@/components/team/TeamMemberCard";
import { getTeamMembers } from "@/lib/api";

export const metadata: Metadata = {
  title: "About & Team",
  description:
    "The people behind The Accountant — independent journalism on the numbers that run the world.",
};

export default async function TeamPage() {
  const team = await getTeamMembers();
  return (
    <Container className="pt-12">
      {/* About the magazine */}
      <section className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-600 dark:text-brass-400">
          About the magazine
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
          Journalism on the numbers that run the world.
        </h1>
        <div className="mt-8 space-y-5 text-left font-serif text-lg leading-[1.85] text-ink-700 dark:text-ink-200">
          <p>
            The Accountant was founded on a simple conviction: the profession
            that certifies the world&apos;s numbers deserves journalism of the
            same standard. Not trade-press cheerleading, not press-release
            paraphrase — reporting with the scepticism the profession itself is
            supposed to practise.
          </p>
          <p>
            We cover audit and assurance, tax in all its cross-border
            complexity, the technology rewiring the back office, and the
            business of accountancy itself — who owns it, who joins it, and
            what it&apos;s worth. Our writers have sat on the other side of the
            working papers; they know where the judgement lives and where the
            bodies are buried.
          </p>
          <p>
            We are independent, subscriber-funded, and allergic to the passive
            voice. Mistakes were not made; when we make them, we correct them
            prominently.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto mt-20 max-w-4xl" aria-labelledby="team-heading">
        <div className="border-b-2 border-ink-950 pb-3 dark:border-ink-100">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-brass-600 dark:text-brass-400">
            The masthead
          </p>
          <h2 id="team-heading" className="font-display text-3xl font-bold tracking-tight">
            The Team
          </h2>
        </div>
        <div className="divide-y divide-ink-950/8 dark:divide-ink-100/10">
          {team.map((member, i) => (
            <TeamMemberCard key={member.id} member={member} index={i} />
          ))}
        </div>
      </section>
    </Container>
  );
}
