export function SpecialOffers() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {[
        { icon: "🎉", title: "Free Delivery", desc: "On orders over $30. Use code FREEDEL", color: "from-green-500 to-emerald-600" },
        { icon: "🎂", title: "Birthday Special", desc: "15% off your birthday week. Sign up required.", color: "from-purple-500 to-pink-600" },
        { icon: "🆕", title: "First Order", desc: "$10 off your first order of $25+.", color: "from-blue-500 to-indigo-600" },
      ].map((o) => (
        <div key={o.title} className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${o.color} p-6 text-white`}>
          <span className="text-3xl">{o.icon}</span>
          <h4 className="mt-3 font-bold">{o.title}</h4>
          <p className="mt-1 text-sm text-white/80">{o.desc}</p>
        </div>
      ))}
    </div>
  );
}
