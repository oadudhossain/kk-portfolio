"use client";
import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import {
  ArrowUp,
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Menu,
  Mail,
  Download,
  Expand,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { profile, navigation } from "@/data/profile";
import { gallery } from "@/data/gallery";
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  useEffect(() => {
    const update = () => {
      let current = "home";
      navigation.forEach((n) => {
        const e = document.getElementById(n.id);
        if (e && e.getBoundingClientRect().top < 160) current = n.id;
      });
      setActive(current);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <header className="site-header">
      <div className="nav-wrap">
        <a href="#home" className="brand" aria-label="Kaniz Sadia Kabita home">
          <img src="/favicon.svg" width="40" height="40" alt="" />
          <span>
            Kaniz<span className="brand-dot">.</span>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((n) => (
            <a
              key={n.id}
              href={"#" + n.id}
              aria-current={active === n.id ? "location" : undefined}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="nav-contact">
          Let’s connect <ArrowUpRight size={17} />
        </a>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="mobile-menu"
              aria-label="Open navigation"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="mobile-sheet">
            <SheetTitle>Kaniz Sadia Kabita</SheetTitle>
            <SheetDescription>Explore my academic journey.</SheetDescription>
            <nav aria-label="Mobile navigation">
              {navigation.map((n) => (
                <a key={n.id} href={"#" + n.id} onClick={() => setOpen(false)}>
                  {n.label}
                  <ArrowUpRight size={20} />
                </a>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
export function Motion() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.07 },
    );
    if (!reduced)
      document.querySelectorAll(".reveal").forEach((e) => {
        e.classList.add("will-reveal");
        observer.observe(e);
      });
    const scroll = () => setVisible(window.scrollY > 650);
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scroll);
    };
  }, []);
  return visible ? (
    <Button
      className="back-top"
      size="icon"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ArrowUp />
    </Button>
  ) : null;
}
export function CVButton() {
  return profile.cvAvailable ? (
    <Button asChild variant="outline" className="cta">
      <a download href={profile.cv}>
        <Download size={17} />
        Download CV
      </a>
    </Button>
  ) : (
    <div className="cv-unavailable">
      <Button className="cta" variant="outline" disabled>
        <Download size={17} />
        Download CV
      </Button>
      <span>CV coming soon</span>
    </div>
  );
}
export function AcademicGallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const item = selected === null ? null : gallery[selected];
  return (
    <>
      <div className="photo-grid">
        {gallery.map((photo, i) => (
          <button
            key={photo.image}
            className={"photo photo-" + i}
            onClick={() => setSelected(i)}
            aria-label={"View photo: " + photo.caption}
          >
            <Image
              src={photo.image}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 80vw, (max-width: 1000px) 45vw, 32vw"
              unoptimized
            />
            <span className="photo-caption">
              <span>
                <small>{photo.category}</small>
                {photo.caption}
              </span>
              <Expand size={18} />
            </span>
          </button>
        ))}
      </div>
      <Dialog
        open={selected !== null}
        onOpenChange={(v) => {
          if (!v) setSelected(null);
        }}
      >
        <DialogContent className="gallery-dialog">
          {item && (
            <>
              <DialogTitle>{item.caption}</DialogTitle>
              <DialogDescription>{item.category}</DialogDescription>
              <div className="lightbox-image">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="90vw"
                  unoptimized
                />
              </div>
              <div className="lightbox-controls">
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Previous photo"
                  onClick={() =>
                    setSelected(
                      ((selected ?? 0) + gallery.length - 1) % gallery.length,
                    )
                  }
                >
                  <ArrowLeft />
                </Button>
                <span>
                  {(selected ?? 0) + 1} / {gallery.length}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Next photo"
                  onClick={() =>
                    setSelected(((selected ?? 0) + 1) % gallery.length)
                  }
                >
                  <ArrowRight />
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
// No delivery service is configured. This adapter only prepares a mailto draft.
function prepareEmail(fields: FormData) {
  return `mailto:${profile.email}?subject=${encodeURIComponent(String(fields.get("subject")))}&body=${encodeURIComponent(`${fields.get("message")}\n\nFrom: ${fields.get("name")}\nEmail: ${fields.get("email")}`)}`;
}
export function ContactForm() {
  const [draft, setDraft] = useState("");
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const fields = new FormData(form);
    for (const key of ["name", "subject", "message"]) {
      const input = form.elements.namedItem(key) as HTMLInputElement;
      input.setCustomValidity(
        String(fields.get(key)).trim() ? "" : "Please complete this field.",
      );
      if (!input.reportValidity()) return;
    }
    setDraft(prepareEmail(fields));
  }
  return (
    <form
      className="contact-form"
      onSubmit={submit}
      onInput={(e) => {
        (e.target as HTMLInputElement).setCustomValidity?.("");
        setDraft("");
      }}
    >
      <div className="form-row">
        <label htmlFor="contact-name">
          Your name
          <Input
            id="contact-name"
            name="name"
            placeholder="Full name"
            autoComplete="name"
            required
            maxLength={100}
          />
        </label>
        <label htmlFor="contact-email">
          Email address
          <Input
            id="contact-email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
            maxLength={254}
          />
        </label>
      </div>
      <label htmlFor="contact-subject">
        Subject
        <Input
          id="contact-subject"
          name="subject"
          placeholder="What would you like to talk about?"
          required
          maxLength={200}
        />
      </label>
      <label htmlFor="contact-message">
        Your message
        <Textarea
          id="contact-message"
          name="message"
          placeholder="Tell me a little about your idea or opportunity..."
          rows={5}
          required
          maxLength={5000}
        />
      </label>
      <p className="form-note">
        Direct form delivery is not connected. Prepare your message here, then
        send it through your email app.
      </p>
      <Button type="submit" className="cta">
        Prepare email <ArrowUpRight size={17} />
      </Button>
      {draft && (
        <div className="draft-status" role="status">
          Your draft is ready. No message has been sent.
          <a href={draft}>
            Open email app <Mail size={16} />
          </a>
        </div>
      )}
    </form>
  );
}
export function Copyright() {
  return (
    <span>
      {/* © {new Date().getFullYear()} {profile.name}. All rights reserved. */}©{" "}
      {new Date().getFullYear()} All rights reserved to DIPU, who loves KABITA.
    </span>
  );
}
