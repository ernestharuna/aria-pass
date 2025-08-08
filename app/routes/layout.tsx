import { Facebook, Instagram, Twitter } from 'lucide-react'
import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'

export default function DefaultLayout() {
    const [scrolled, setScrolled] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 70);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <>
            <nav className={`sticky top-0 z-10 bg-white py-4 px-18 flex items-center justify-between transition-all ${scrolled && 'shadow-lg'}`}>
                <Link to="/" className='flex items-center'>
                    <div className="h-8 w-8 rounded-full bg-[#F6A700] me-3" />
                    <div className='text-xl '>
                        <span className=" text-gray-400 font-medium">Aria</span>
                        <span className="text-black font-medium">Pass</span>
                    </div>
                </Link>

                <ul className='flex gap-8 text-sm'>
                    {['Explore', 'Organisers', 'Programs', 'Courses'].map((item) => (
                        <li className='hover:text-gray-400 transition-all'>
                            <Link to={item.toLowerCase()}>{item}</Link>
                        </li>
                    ))}
                </ul>

                <div className='flex items-center gap-2'>
                    <Button size={'sm'} variant={'ghost'} className='px-6 py-6 rounded-full'>
                        Register
                    </Button>
                    <Button size={'sm'} className='px-6 py-6 bg-[#3A3546] rounded-full'>
                        Log in
                    </Button>
                </div>
            </nav>

            <Outlet />

            <footer className="bg-white text-muted-foreground px-6 pt-20">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h2 className="text-lg font-semibold text-foreground">
                            <Link to="/" className='text-xl'>
                                <span className=" text-gray-400 font-medium">Aria</span>
                                <span className="text-black font-medium">Pass</span>
                            </Link>
                        </h2>
                        <p className="mt-2 mb-6 text-xs w-sm">
                            A space for classical musicians to connect, share, and explore the world of music.
                        </p>

                        <div className="flex w-full max-w-sm items-center gap-2">
                            <Input type="email" placeholder="Subscribe to updates" className='rounded text-xs placeholder:text-xs' />
                            <Button type="submit" variant="secondary" className='rounded text-xs'>
                                Subscribe
                            </Button>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h5 className="font-medium text-foreground mb-5 text-md">Quick Links</h5>
                        <div className="flex flex-col space-y-3 text-xs">
                            <Link to="/events" className="hover:text-foreground">Graded Exams</Link>
                            <Link to="/events" className="hover:text-foreground">Concerts</Link>
                            <Link to="/forums" className="hover:text-foreground">Recitals & Halls</Link>
                            <Link to="/explore" className="hover:text-foreground">Verified Organisers</Link>
                        </div>
                    </div>

                    {/* Social / Legal */}

                    <div>
                        <h5 className="font-medium text-foreground mb-5 text-md">Follow our updates</h5>
                        <div className="flex flex-col justify-between text-xs">
                            <div className="flex flex-col items-start space-y-3 mb-8">
                                <a href="#" aria-label="Twitter" className="hover:text-foreground flex gap-2 items-center">
                                    <Twitter className="h-4 w-4" /> <span>Twitter</span>
                                </a>
                                <a href="#" aria-label="Instagram" className="hover:text-foreground flex gap-2 items-center">
                                    <Instagram className="h-4 w-4" /> <span>Instagram</span>
                                </a>
                                <a href="#" aria-label="Facebook" className="hover:text-foreground flex gap-2 items-center">
                                    <Facebook className="h-4 w-4" /> <span>Facebook</span>
                                </a>
                            </div>
                            <div className="space-x-4">
                                <Link to="/terms" className="hover:text-foreground">Terms of Use.</Link>
                                <Link to="/privacy" className="hover:text-foreground">Privacy Policy.</Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom note */}
                <div className="mt-10 border-t text-xs text-center text-muted-foreground py-5">
                    &copy; {new Date().getFullYear()} AriaPass. Built for the music community.
                </div>
            </footer>
        </>
    )
}
