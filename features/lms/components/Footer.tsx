export function Footer() {
  return (
    <div className="border-t border-border pt-8 dark:border-border">
      <div className="grid gap-8 text-sm sm:grid-cols-4">
        <div><h4 className="mb-4 font-bold text-foreground">LMS Platform</h4><ul className="space-y-2.5 text-muted-foreground"><li className="hover:text-foreground cursor-pointer transition-colors">About Us</li><li className="hover:text-foreground cursor-pointer transition-colors">Careers</li><li className="hover:text-foreground cursor-pointer transition-colors">Press</li><li className="hover:text-foreground cursor-pointer transition-colors">Blog</li></ul></div>
        <div><h4 className="mb-4 font-bold text-foreground">For Learners</h4><ul className="space-y-2.5 text-muted-foreground"><li className="hover:text-foreground cursor-pointer transition-colors">Browse Courses</li><li className="hover:text-foreground cursor-pointer transition-colors">Learning Paths</li><li className="hover:text-foreground cursor-pointer transition-colors">Certifications</li><li className="hover:text-foreground cursor-pointer transition-colors">Enterprise</li></ul></div>
        <div><h4 className="mb-4 font-bold text-foreground">For Instructors</h4><ul className="space-y-2.5 text-muted-foreground"><li className="hover:text-foreground cursor-pointer transition-colors">Become an Instructor</li><li className="hover:text-foreground cursor-pointer transition-colors">Teaching Resources</li><li className="hover:text-foreground cursor-pointer transition-colors">Community Forum</li><li className="hover:text-foreground cursor-pointer transition-colors">Payouts</li></ul></div>
        <div><h4 className="mb-4 font-bold text-foreground">Support</h4><ul className="space-y-2.5 text-muted-foreground"><li className="hover:text-foreground cursor-pointer transition-colors">Help Center</li><li className="hover:text-foreground cursor-pointer transition-colors">Contact Us</li><li className="hover:text-foreground cursor-pointer transition-colors">Privacy Policy</li><li className="hover:text-foreground cursor-pointer transition-colors">Terms of Service</li></ul></div>
      </div>
      <p className="mt-8 text-center text-xs text-muted-foreground/70">&copy; 2026 LMS Platform. All rights reserved.</p>
    </div>
  );
}
