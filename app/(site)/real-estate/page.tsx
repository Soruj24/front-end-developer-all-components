"use client";

import { useState } from "react";
import { propertyTypes, listingStatuses, properties, savedHomes, recentlyViewed, similarHomes, newDevelopments, foreclosureListings, priceHistory, marketTrends, schoolRatings, openHouses, agent, neighborhoodInfo } from "./data";
import { formatPrice } from "./formatPrice";
import { StatusBadge } from "./StatusBadge";
import { PropertyCard } from "./PropertyCard";

export default function RealEstatePage() {
  const [activeType, setActiveType] = useState("All");
  const [activeStatus, setActiveStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minBeds, setMinBeds] = useState("");
  const [minBaths, setMinBaths] = useState("");
  const [mortgageAmount, setMortgageAmount] = useState("500000");
  const [interestRate, setInterestRate] = useState("6.5");
  const [loanTerm, setLoanTerm] = useState("30");
  const [annualIncome, setAnnualIncome] = useState("120000");
  const [monthlyDebt, setMonthlyDebt] = useState("500");
  const [downPayment, setDownPayment] = useState("20");

  const filteredProperties = properties.filter((p) => {
    if (activeType !== "All" && p.type !== activeType) return false;
    if (activeStatus !== "All" && p.status !== activeStatus) return false;
    if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase()) && !p.address.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (minPrice && p.price < parseInt(minPrice)) return false;
    if (maxPrice && p.price > parseInt(maxPrice)) return false;
    if (minBeds && p.beds < parseInt(minBeds)) return false;
    if (minBaths && p.baths < parseInt(minBaths)) return false;
    return true;
  });

  const principal = parseFloat(mortgageAmount) - (parseFloat(mortgageAmount) * parseFloat(downPayment || "0") / 100);
  const monthlyRate = parseFloat(interestRate) / 100 / 12;
  const numPayments = parseFloat(loanTerm) * 12;
  const monthlyPayment = monthlyRate > 0 && numPayments > 0
    ? principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
    : 0;

  const maxPriceByIncome = parseFloat(annualIncome) * 0.36 / 12 * 240;

  return (
    <div className="flex flex-col gap-12 p-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Real Estate</h1>
        <p className="text-muted-foreground">Find your dream home with powerful search and insights.</p>
      </div>

      <div className="rounded-xl border border-border bg-white p-6 shadow-sm dark:border-border dark:bg-zinc-900">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Search Properties</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by address or name..."
              className="w-full rounded-lg border border-border bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-muted dark:text-zinc-100 dark:placeholder-zinc-500"
            />
          </div>
          <div className="flex gap-2">
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Min Price"
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-muted dark:text-zinc-100 dark:placeholder-zinc-500"
            />
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Max Price"
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-muted dark:text-zinc-100 dark:placeholder-zinc-500"
            />
          </div>
          <input
            type="number"
            value={minBeds}
            onChange={(e) => setMinBeds(e.target.value)}
            placeholder="Min Beds"
            className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-muted dark:text-zinc-100 dark:placeholder-zinc-500"
          />
          <input
            type="number"
            value={minBaths}
            onChange={(e) => setMinBaths(e.target.value)}
            placeholder="Min Baths"
            className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-muted dark:text-zinc-100 dark:placeholder-zinc-500"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="mr-2 text-sm font-medium text-muted-foreground">Type:</span>
        {propertyTypes.map((type) => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeType === type
                ? "bg-blue-600 text-white"
                : "bg-muted text-muted-foreground hover:bg-muted dark:text-muted-foreground dark:hover:bg-muted"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="mr-2 text-sm font-medium text-muted-foreground">Status:</span>
        {listingStatuses.map((status) => (
          <button
            key={status}
            onClick={() => setActiveStatus(status)}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeStatus === status
                ? "bg-blue-600 text-white"
                : "bg-muted text-muted-foreground hover:bg-muted dark:text-muted-foreground dark:hover:bg-muted"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProperties.length === 0 ? (
          <div className="col-span-full py-12 text-center text-muted-foreground">No properties match your search criteria.</div>
        ) : (
          filteredProperties.map((p) => <PropertyCard key={p.id} p={p} />)
        )}
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">Featured Listing</h2>
        <div className="group relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 p-8 text-white transition-all hover:shadow-xl">
          <div className="absolute right-4 top-4 flex gap-2">
            <StatusBadge status="For Sale" />
            <span className="rounded-full bg-amber-400/30 px-2.5 py-0.5 text-xs font-medium text-amber-200 backdrop-blur-sm">Featured</span>
          </div>
          <span className="mb-3 w-fit rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-sm">Villa · Malibu, CA</span>
          <h2 className="mb-2 text-2xl font-bold group-hover:underline">Modern Waterfront Villa</h2>
          <p className="mb-4 max-w-2xl text-sm text-white/80">Stunning 5-bedroom villa with panoramic ocean views, private pool, and smart home technology.</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
            <span className="flex items-center gap-1"><svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>5 Beds</span>
            <span className="flex items-center gap-1"><svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>4 Baths</span>
            <span className="flex items-center gap-1"><svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>4,200 sqft</span>
            <span className="ml-auto text-2xl font-bold text-white">$4.5M</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
          <h2 className="mb-4 text-base font-semibold text-foreground">Agent Profile</h2>
          <div className="flex flex-col items-center gap-4">
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400" />
            <div className="text-center">
              <h4 className="text-lg font-semibold text-foreground">{agent.name}</h4>
              <p className="text-sm text-muted-foreground dark:text-muted-foreground/70">{agent.title}</p>
              <p className="text-xs text-muted-foreground/70 dark:text-muted-foreground">{agent.company}</p>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <svg className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              <span className="font-medium text-foreground">{agent.rating}</span>
              <span className="text-muted-foreground/70">({agent.reviews} reviews)</span>
            </div>
            <div className="grid w-full grid-cols-2 gap-3 text-center text-sm">
              <div className="rounded-lg bg-muted/40 p-3 dark:bg-muted"><span className="block text-lg font-bold text-foreground">{agent.listings}</span><span className="text-muted-foreground dark:text-muted-foreground/70">Listings</span></div>
              <div className="rounded-lg bg-muted/40 p-3 dark:bg-muted"><span className="block text-lg font-bold text-foreground">{agent.experience}</span><span className="text-muted-foreground dark:text-muted-foreground/70">Years Exp</span></div>
            </div>
            <div className="flex w-full flex-col gap-2">
              <a href={`tel:${agent.phone}`} className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-blue-700">Call {agent.phone}</a>
              <a href={`mailto:${agent.email}`} className="w-full rounded-lg border border-border px-4 py-2.5 text-center text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/40 dark:border-border dark:text-muted-foreground dark:hover:bg-muted">Email Agent</a>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
          <h2 className="mb-4 text-base font-semibold text-foreground">Mortgage Calculator</h2>
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="home-price" className="mb-1 block text-xs font-medium text-muted-foreground dark:text-muted-foreground/70">Home Price</label>
              <input id="home-price" type="number" value={mortgageAmount} onChange={(e) => setMortgageAmount(e.target.value)} className="w-full rounded-lg border border-border bg-white px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-muted dark:text-zinc-100" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="down-payment" className="mb-1 block text-xs font-medium text-muted-foreground dark:text-muted-foreground/70">Down Payment (%)</label>
                <input id="down-payment" type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} className="w-full rounded-lg border border-border bg-white px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-muted dark:text-zinc-100" />
              </div>
              <div>
                <label htmlFor="interest-rate" className="mb-1 block text-xs font-medium text-muted-foreground dark:text-muted-foreground/70">Interest Rate (%)</label>
                <input id="interest-rate" type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full rounded-lg border border-border bg-white px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-muted dark:text-zinc-100" />
              </div>
            </div>
            <div>
        <label htmlFor="loan-term" className="mb-1 block text-xs font-medium text-muted-foreground dark:text-muted-foreground/70">Loan Term (years)</label>
        <select id="loan-term" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} className="w-full rounded-lg border border-border bg-white px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-muted dark:text-zinc-100">
                <option value="15">15 years</option>
                <option value="20">20 years</option>
                <option value="30">30 years</option>
              </select>
            </div>
            <div className="rounded-lg bg-blue-50 p-4 text-center dark:bg-blue-950/30">
              <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">Monthly Payment</p>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">${isFinite(monthlyPayment) ? monthlyPayment.toFixed(2) : "0.00"}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
          <h2 className="mb-4 text-base font-semibold text-foreground">Rent vs Buy Calculator</h2>
          <div className="flex flex-col gap-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground dark:text-muted-foreground/70">Annual Income</label>
              <input type="number" value={annualIncome} onChange={(e) => setAnnualIncome(e.target.value)} className="w-full rounded-lg border border-border bg-white px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-muted dark:text-zinc-100" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground dark:text-muted-foreground/70">Monthly Debt Payments</label>
              <input type="number" value={monthlyDebt} onChange={(e) => setMonthlyDebt(e.target.value)} className="w-full rounded-lg border border-border bg-white px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-muted dark:text-zinc-100" />
            </div>
            <div className="rounded-lg bg-emerald-50 p-4 dark:bg-emerald-950/30">
              <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">Maximum Affordable Home Price</p>
              <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{formatPrice(maxPriceByIncome)}</p>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between"><span>Estimated Monthly Mortgage</span><span className="font-medium text-foreground">${isFinite(monthlyPayment) ? Math.round(monthlyPayment).toLocaleString() : "0"}</span></div>
              <div className="flex justify-between"><span>Average Rent (similar)</span><span className="font-medium text-foreground">$3,200</span></div>
              <div className="flex justify-between border-t border-border pt-2 dark:border-border"><span className="font-medium">Monthly Savings</span><span className={`font-bold ${monthlyPayment < 3200 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>{monthlyPayment < 3200 ? "$" + Math.round(3200 - monthlyPayment).toLocaleString() : "-$" + Math.round(monthlyPayment - 3200).toLocaleString()}</span></div>
            </div>
            <div className={`rounded-lg p-3 text-center text-sm font-medium ${monthlyPayment < 3200 ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300" : "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"}`}>
              {monthlyPayment < 3200 ? "Buying is more affordable than renting" : "Renting may be more affordable currently"}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
          <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-foreground">
            <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
            Saved Homes
          </h2>
          <div className="flex flex-col gap-3">
            {savedHomes.map((h) => (
              <div key={h.id} className="flex items-center justify-between rounded-lg bg-muted/40 p-3 transition-colors hover:bg-muted dark:bg-muted dark:hover:bg-muted">
                <div>
                  <p className="text-sm font-medium text-foreground">{h.title}</p>
                  <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">Saved {h.savedDate}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">{formatPrice(h.price)}</p>
                  <button className="text-xs text-red-500 hover:text-red-600">Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
          <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-foreground">
            <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Recently Viewed
          </h2>
          <div className="flex flex-col gap-3">
            {recentlyViewed.map((h) => (
              <div key={h.id} className="flex items-center justify-between rounded-lg bg-muted/40 p-3 transition-colors hover:bg-muted dark:bg-muted dark:hover:bg-muted">
                <div>
                  <p className="text-sm font-medium text-foreground">{h.title}</p>
                  <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">{h.viewedDate}</p>
                </div>
                <p className="text-sm font-semibold text-foreground">{formatPrice(h.price)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
          <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-foreground">
            <svg className="h-5 w-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            Recommended For You
          </h2>
          <div className="flex flex-col gap-3">
            {properties.filter((p) => p.featured).slice(0, 3).map((h) => (
              <div key={h.id} className="flex items-center justify-between rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 p-3 dark:from-purple-950/20 dark:to-pink-950/20">
                <div>
                  <p className="text-sm font-medium text-foreground">{h.title}</p>
                  <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">{h.beds} beds · {h.sqft.toLocaleString()} sqft</p>
                </div>
                <p className="text-sm font-semibold text-foreground">{formatPrice(h.price)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
        <h2 className="mb-4 text-base font-semibold text-foreground">Property Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground dark:text-muted-foreground/70">Feature</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground dark:text-muted-foreground/70">Waterfront Villa</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground dark:text-muted-foreground/70">Luxury Condo</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground dark:text-muted-foreground/70">Family Home</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
              {[
                { label: "Price", v1: "$4,500,000", v2: "$875,000", v3: "$625,000" },
                { label: "Beds", v1: "5", v2: "2", v3: "4" },
                { label: "Baths", v1: "4", v2: "2", v3: "3" },
                { label: "Sq Ft", v1: "4,200", v2: "1,250", v3: "2,800" },
                { label: "Price/Sqft", v1: "$1,071", v2: "$700", v3: "$223" },
                { label: "Year Built", v1: "2023", v2: "2020", v3: "2018" },
                { label: "HOA", v1: "$0/mo", v2: "$450/mo", v3: "$0/mo" },
                { label: "Lot Size", v1: "0.5 acres", v2: "N/A", v3: "0.25 acres" },
              ].map((row) => (
                <tr key={row.label} className="transition-colors hover:bg-muted/40 dark:hover:bg-muted/50">
                  <td className="px-4 py-3 font-medium text-foreground">{row.label}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.v1}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.v2}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.v3}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
          <h2 className="mb-4 text-base font-semibold text-foreground">Price History</h2>
          <div className="flex flex-col gap-3">
            {priceHistory.map((h, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg bg-muted/40 p-3 dark:bg-muted">
                <div className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full ${h.event === "Sold" ? "bg-green-500" : h.event === "Price Reduced" ? "bg-red-500" : "bg-blue-500"}`} />
                  <div>
                    <p className="text-sm font-medium text-foreground">{h.event}</p>
                    <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">{h.date}</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-foreground">{formatPrice(h.price)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
          <h2 className="mb-4 text-base font-semibold text-foreground">Market Trends</h2>
          <div className="flex items-end justify-between gap-1" style={{ height: 160 }}>
            {marketTrends.map((t) => {
              const heightPercent = (t.salesVolume / 650) * 100;
              return (
                <div key={t.year} className="flex flex-1 flex-col items-center gap-1">
                  <span className="text-[10px] text-muted-foreground dark:text-muted-foreground/70">{formatPrice(t.medianPrice)}</span>
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-blue-500 to-blue-400 transition-all hover:from-blue-600 hover:to-blue-500 dark:from-blue-700 dark:to-blue-600"
                    style={{ height: `${heightPercent}%` }}
                  />
                  <span className="text-[10px] text-muted-foreground dark:text-muted-foreground/70">{t.year}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground dark:text-muted-foreground/70">
            <span>Median Price: {formatPrice(marketTrends[marketTrends.length - 1].medianPrice)}</span>
            <span>↑ 5.7% YoY</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
          <h2 className="mb-4 text-base font-semibold text-foreground">Neighborhood Info</h2>
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-bold text-foreground">{neighborhoodInfo.name}</h4>
            <p className="text-sm text-muted-foreground">{neighborhoodInfo.description}</p>
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg bg-green-50 p-3 text-center dark:bg-green-950/30">
                <p className="text-lg font-bold text-green-700 dark:text-green-300">{neighborhoodInfo.walkScore}</p>
                <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">Walk Score</p>
              </div>
              <div className="rounded-lg bg-blue-50 p-3 text-center dark:bg-blue-950/30">
                <p className="text-lg font-bold text-blue-700 dark:text-blue-300">{neighborhoodInfo.transitScore}</p>
                <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">Transit Score</p>
              </div>
              <div className="rounded-lg bg-purple-50 p-3 text-center dark:bg-purple-950/30">
                <p className="text-lg font-bold text-purple-700 dark:text-purple-300">{neighborhoodInfo.bikeScore}</p>
                <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">Bike Score</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center text-sm">
              <div className="rounded-lg bg-muted/40 p-3 dark:bg-muted"><span className="block text-base font-bold text-foreground">{formatPrice(neighborhoodInfo.medianHomePrice)}</span><span className="text-xs text-muted-foreground">Median Home</span></div>
              <div className="rounded-lg bg-muted/40 p-3 dark:bg-muted"><span className="block text-base font-bold text-foreground">${neighborhoodInfo.avgRent.toLocaleString()}</span><span className="text-xs text-muted-foreground">Avg Rent</span></div>
              <div className="rounded-lg bg-muted/40 p-3 dark:bg-muted"><span className="block text-base font-bold text-foreground">{neighborhoodInfo.population.toLocaleString()}</span><span className="text-xs text-muted-foreground">Population</span></div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
          <h2 className="mb-4 text-base font-semibold text-foreground">School Ratings</h2>
          <div className="flex flex-col gap-3">
            {schoolRatings.map((school) => (
              <div key={school.name} className="flex items-center justify-between rounded-lg bg-muted/40 p-3 transition-colors hover:bg-muted dark:bg-muted dark:hover:bg-muted">
                <div>
                  <p className="text-sm font-medium text-foreground">{school.name}</p>
                  <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">{school.type} · Grades {school.grades}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {Array.from({ length: 5 }, (_, i) => (
                      <svg key={i} className={`h-4 w-4 ${i < Math.ceil(school.rating / 2) ? "text-amber-400" : "text-muted-foreground"}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-bold text-foreground">{school.rating}/10</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
          <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-foreground">
            <svg className="h-5 w-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Open House Schedule
          </h2>
          <div className="flex flex-col gap-3">
            {openHouses.map((oh, i) => (
              <div key={i} className="rounded-lg bg-muted/40 p-3 transition-colors hover:bg-muted dark:bg-muted dark:hover:bg-muted">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">{oh.date}</span>
                  <span className="text-xs text-muted-foreground dark:text-muted-foreground/70">{oh.time}</span>
                </div>
                <p className="mt-1 text-sm font-medium text-foreground">{oh.title}</p>
                <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">{oh.address}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
          <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-foreground">
            <svg className="h-5 w-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            Virtual Tour
          </h2>
          <div className="flex aspect-video items-center justify-center rounded-lg bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-indigo-950/40 dark:via-purple-950/40 dark:to-pink-950/40">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-indigo-400 dark:text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="mt-2 text-sm font-medium text-indigo-600 dark:text-indigo-400">Start Virtual Tour</p>
              <p className="text-xs text-muted-foreground/70 dark:text-muted-foreground">360° immersive experience</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
          <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-foreground">
            <svg className="h-5 w-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            Floor Plan
          </h2>
          <div className="flex aspect-square items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/40 dark:border-border dark:bg-muted">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-muted-foreground/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
              <p className="mt-2 text-sm font-medium text-muted-foreground">View Floor Plan</p>
              <p className="text-xs text-muted-foreground/70 dark:text-muted-foreground">Open floor concept with 3 layouts</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
        <h2 className="mb-4 text-base font-semibold text-foreground">Map View</h2>
        <div className="flex h-64 items-center justify-center rounded-lg bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900">
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-muted-foreground/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="mt-2 text-sm font-medium text-muted-foreground">Interactive Map</p>
            <p className="text-xs text-muted-foreground/70 dark:text-muted-foreground">42 properties found in this area</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
          <h2 className="mb-4 text-base font-semibold text-foreground">Contact Agent</h2>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <input type="text" placeholder="Your Name" className="rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-muted dark:text-zinc-100 dark:placeholder-zinc-500" />
              <input type="email" placeholder="Your Email" className="rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-muted dark:text-zinc-100 dark:placeholder-zinc-500" />
            </div>
            <input type="tel" placeholder="Phone Number" className="rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-muted dark:text-zinc-100 dark:placeholder-zinc-500" />
            <textarea rows={3} placeholder="Your message..." className="rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-muted dark:text-zinc-100 dark:placeholder-zinc-500" />
            <button className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700">Send Message</button>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
          <h2 className="mb-4 text-base font-semibold text-foreground">Schedule a Viewing</h2>
          <div className="flex flex-col gap-4">
            <input type="text" placeholder="Property Address" defaultValue="42 Ocean Drive, Malibu, CA" className="rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-muted dark:text-zinc-100 dark:placeholder-zinc-500" />
            <div className="grid grid-cols-2 gap-3">
              <input type="date" defaultValue="2026-08-05" className="rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-muted dark:text-zinc-100 dark:placeholder-zinc-500" />
              <select className="rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-muted dark:text-zinc-100">
                <option>9:00 AM</option>
                <option>10:00 AM</option>
                <option>11:00 AM</option>
                <option>12:00 PM</option>
                <option>1:00 PM</option>
                <option>2:00 PM</option>
                <option>3:00 PM</option>
                <option>4:00 PM</option>
                <option>5:00 PM</option>
              </select>
            </div>
            <input type="text" placeholder="Your Name" className="rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-muted dark:text-zinc-100 dark:placeholder-zinc-500" />
            <input type="email" placeholder="Your Email" className="rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-muted dark:text-zinc-100 dark:placeholder-zinc-500" />
            <button className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700">Request Viewing</button>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">Similar Homes You Might Like</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {similarHomes.map((p) => (
            <div key={p.id} className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white transition-all hover:shadow-lg dark:border-border dark:bg-zinc-900">
              <div className="flex h-40 items-center justify-center bg-gradient-to-br from-teal-100 via-cyan-100 to-emerald-100 dark:from-teal-950/40 dark:via-cyan-950/40 dark:to-emerald-950/40">
                <svg className="h-10 w-10 text-teal-300 dark:text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div className="p-4">
                <StatusBadge status={p.status} />
                <h2 className="mt-2 text-sm font-semibold text-zinc-900 transition-colors group-hover:text-blue-600 dark:text-zinc-100 dark:group-hover:text-blue-400">{p.title}</h2>
                <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">{p.address}</p>
                <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{p.beds} beds</span><span>{p.baths} baths</span><span>{p.sqft.toLocaleString()} sqft</span>
                </div>
                <p className="mt-1 text-base font-bold text-foreground">{formatPrice(p.price)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">New Developments</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {newDevelopments.map((d) => (
            <div key={d.name} className="rounded-xl border border-border bg-white p-5 transition-all hover:shadow-md dark:border-border dark:bg-zinc-900">
              <div className="mb-3 flex h-32 items-center justify-center rounded-lg bg-gradient-to-br from-rose-100 via-orange-100 to-amber-100 dark:from-rose-950/40 dark:via-orange-950/40 dark:to-amber-950/40">
                <svg className="h-8 w-8 text-rose-400 dark:text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-sm font-semibold text-foreground">{d.name}</h2>
              <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">{d.location}</p>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{d.units} units</span>
                <span className="font-medium text-emerald-600 dark:text-emerald-400">{d.completion}</span>
              </div>
              <p className="mt-1 text-sm font-bold text-foreground">Starting {formatPrice(d.startingPrice)}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">Foreclosure & Bank-Owned Properties</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {foreclosureListings.map((f) => (
            <div key={f.title} className="rounded-xl border-2 border-red-200 bg-white p-5 transition-all hover:shadow-md dark:border-red-900/50 dark:bg-zinc-900">
              <div className="mb-3 flex h-28 items-center justify-center rounded-lg bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 dark:from-red-950/30 dark:via-orange-950/30 dark:to-amber-950/30">
                <svg className="h-8 w-8 text-red-400 dark:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-sm font-semibold text-foreground">{f.title}</h2>
              <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">{f.address}</p>
              <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                <span>{f.beds} beds</span><span>{f.baths} baths</span><span>{f.sqft.toLocaleString()} sqft</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-base font-bold text-red-600 dark:text-red-400">{formatPrice(f.price)}</p>
                <span className="text-xs text-muted-foreground dark:text-muted-foreground/70">Auction: {f.auctionDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
          <h2 className="mb-4 text-base font-semibold text-foreground">Home Value Estimator</h2>
          <div className="flex flex-col gap-4">
            <input type="text" placeholder="Enter your address" className="rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-muted dark:text-zinc-100 dark:placeholder-zinc-500" />
            <div className="flex gap-3">
              <input type="number" placeholder="Sq Ft" className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-muted dark:text-zinc-100 dark:placeholder-zinc-500" />
              <input type="number" placeholder="Bedrooms" className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-muted dark:text-zinc-100 dark:placeholder-zinc-500" />
              <input type="number" placeholder="Bathrooms" className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-muted dark:text-zinc-100 dark:placeholder-zinc-500" />
            </div>
            <button className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700">Estimate My Home Value</button>
            <div className="rounded-lg bg-blue-50 p-4 text-center dark:bg-blue-950/30">
              <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">Estimated Value Range</p>
              <p className="text-xl font-bold text-blue-700 dark:text-blue-300">$580K - $650K</p>
              <p className="text-xs text-muted-foreground/70 dark:text-muted-foreground">Based on comparable sales in your area</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
          <h2 className="mb-4 text-base font-semibold text-foreground">Property Alerts</h2>
          <div className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">Get notified when new properties matching your criteria hit the market.</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground dark:text-muted-foreground/70">Property Type</label>
                <select className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-muted dark:text-zinc-100">
                  <option>Any</option>
                  <option>House</option>
                  <option>Condo</option>
                  <option>Townhouse</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground dark:text-muted-foreground/70">Max Price</label>
                <input type="number" placeholder="Any" className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-muted dark:text-zinc-100 dark:placeholder-zinc-500" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground dark:text-muted-foreground/70">Min Beds</label>
                <select className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-muted dark:text-zinc-100">
                  <option>Any</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4+</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground dark:text-muted-foreground/70">Min Baths</label>
                <select className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-muted dark:text-zinc-100">
                  <option>Any</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3+</option>
                </select>
              </div>
            </div>
            <input type="email" placeholder="your@email.com" className="rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-muted dark:text-zinc-100 dark:placeholder-zinc-500" />
            <div className="flex items-center gap-2">
              <input type="checkbox" id="dailyDigest" defaultChecked className="h-4 w-4 rounded border-border text-blue-600 focus:ring-blue-500 dark:border-border" />
              <label htmlFor="dailyDigest" className="text-sm text-muted-foreground">Send daily digest</label>
            </div>
            <button className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700">Set Up Alerts</button>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-gradient-to-br from-blue-50 to-indigo-50 p-6 dark:border-border dark:from-blue-950/20 dark:to-indigo-950/20">
        <h2 className="mb-4 text-base font-semibold text-foreground">Commute Time</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-lg bg-white p-4 dark:bg-zinc-900">
            <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/50">
              <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">Downtown</p>
              <p className="text-sm font-bold text-foreground">22 min</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-white p-4 dark:bg-zinc-900">
            <div className="rounded-full bg-emerald-100 p-2 dark:bg-emerald-900/50">
              <svg className="h-5 w-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">Airport</p>
              <p className="text-sm font-bold text-foreground">35 min</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-white p-4 dark:bg-zinc-900">
            <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900/50">
              <svg className="h-5 w-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">School District</p>
              <p className="text-sm font-bold text-foreground">8 min</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
        <h2 className="mb-4 text-base font-semibold text-foreground">Property Details</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Property Type", value: "Single Family Home" },
            { label: "Year Built", value: "2023" },
            { label: "Lot Size", value: "0.5 acres" },
            { label: "Garage", value: "3 Cars" },
            { label: "Heating", value: "Forced Air" },
            { label: "Cooling", value: "Central AC" },
            { label: "HOA Fee", value: "$0/mo" },
            { label: "Taxes", value: "$12,500/yr" },
            { label: "Stories", value: "2" },
            { label: "Parking", value: "Driveway" },
            { label: "Roof", value: "Tile" },
            { label: "Foundation", value: "Concrete" },
          ].map((d) => (
            <div key={d.label} className="rounded-lg bg-muted/40 p-3 dark:bg-muted">
              <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">{d.label}</p>
              <p className="text-sm font-medium text-foreground">{d.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
        <h2 className="mb-4 text-base font-semibold text-foreground">Image Gallery</h2>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex aspect-[4/3] items-center justify-center rounded-lg bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-100 transition-transform hover:scale-[1.02] dark:from-sky-950/40 dark:via-blue-950/40 dark:to-indigo-950/40">
              <svg className="h-8 w-8 text-blue-300 dark:text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 border-t border-border pt-6 text-center dark:border-border">
        <p className="text-sm text-muted-foreground dark:text-muted-foreground/70">Showing 1-10 of 42 properties</p>
        <div className="flex gap-2">
          <button className="rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/40 dark:border-border dark:text-muted-foreground/70 dark:hover:bg-muted">Prev</button>
          {[1, 2, 3, 4, 5].map((p) => (
            <button
              key={p}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                p === 1
                  ? "bg-blue-600 text-white"
                  : "border border-border text-muted-foreground hover:bg-muted/40 dark:border-border dark:text-muted-foreground/70 dark:hover:bg-muted"
              }`}
            >
              {p}
            </button>
          ))}
          <button className="rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/40 dark:border-border dark:text-muted-foreground/70 dark:hover:bg-muted">Next</button>
        </div>
      </div>
    </div>
  );
}
