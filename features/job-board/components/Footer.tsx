export function Footer() {
  return (
    <div className="border-t border-zinc-200 pt-8 dark:border-zinc-800">
      <div className="grid gap-8 text-sm sm:grid-cols-4">
        <div>
          <h4 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-white">Job Board</h4>
          <ul className="space-y-2.5">
            {["About Us", "Careers", "Press", "Blog"].map((item) => (
              <li key={item} className="cursor-pointer text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-white">For Job Seekers</h4>
          <ul className="space-y-2.5">
            {["Browse Jobs", "Career Advice", "Resume Builder", "Salary Calculator"].map((item) => (
              <li key={item} className="cursor-pointer text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-white">For Employers</h4>
          <ul className="space-y-2.5">
            {["Post a Job", "Pricing", "Recruiting Solutions", "Employer Branding"].map((item) => (
              <li key={item} className="cursor-pointer text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-white">Support</h4>
          <ul className="space-y-2.5">
            {["Help Center", "Contact Us", "Privacy Policy", "Terms of Service"].map((item) => (
              <li key={item} className="cursor-pointer text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-8 text-center text-xs text-zinc-400 dark:text-zinc-500">&copy; 2026 JobBoard. All rights reserved.</p>
    </div>
  );
}
