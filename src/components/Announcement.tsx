import Link from "next/link";

export default function Announcement() {
  return (
    <div className="announce">
      <span>BOOK A CONSULTATION WITH AN MD DERMATOLOGIST</span>
      <span className="announce-dot" />
      <Link href="/#book">Book this week →</Link>
    </div>
  );
}
