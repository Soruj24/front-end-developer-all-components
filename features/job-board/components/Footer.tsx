export function Footer() {
  return (
    <div className="border-t border-border pt-8 dark:border-border">
      <div className="grid gap-8 text-sm sm:grid-cols-4">
        <div><h4 className="mb-4 font-bold text-foreground">Job Board</h4><ul className="space-y-2.5 text-muted-foreground"><li className="hover:text-foreground cursor-pointer transition-colors">About Us</li><li className="hover:text-foreground cursor-pointer transition-colors">Careers</li><li className="hover:text-foreground cursor-pointer transition-colors">Press</li><li className="hover:text-foreground cursor-pointer transition-colors">Blog</li></ul></div>
        <div><h4 className="mb-4 font-bold text-foreground">For Job Seekers</h4><ul className="space-y-2.5 text-muted-foreground"><li className="hover:text-foreground cursor-pointer transition-colors">Browse Jobs</li><li className="hover:text-foreground cursor-pointer transition-colors">Career Advice</li><li className="hover:text-foreground cursor-pointer transition-colors">Resume Builder</li><li className="hover:text-foreground cursor-pointer transition-colors">Salary Calculator</li></ul></div>
        <div><h4 className="mb-4 font-bold text-foreground">For Employers</h4><ul className="space-y-2.5 text-muted-foreground"><li className="hover:text-foreground cursor-pointer transition-colors">Post a Job</li><li className="hover:text-foreground cursor-pointer transition-colors">Pricing</li><li className="hover:text-foreground cursor-pointer transition-colors">Recruiting Solutions</li><li className="hover:text-foreground cursor-pointer transition-colors">Employer Branding</li></ul></div>
        <div><h4 className="mb-4 font-bold text-foreground">Support</h4><ul className="space-y-2.5 text-muted-foreground"><li className="hover:text-foreground cursor-pointer transition-colors">Help Center</li><li className="hover:text-foreground cursor-pointer transition-colors">Contact Us</li><li className="hover:text-foreground cursor-pointer transition-colors">Privacy Policy</li><li className="hover:text-foreground cursor-pointer transition-colors">Terms of Service</li></ul></div>
      </div>
      <p className="mt-8 text-center text-xs text-muted-foreground/70">&copy; 2026 JobBoard. All rights reserved.</p>
    </div>
  );
}
