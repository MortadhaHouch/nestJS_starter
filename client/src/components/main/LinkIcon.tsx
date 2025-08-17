import { SiCodepen, SiReplit } from "react-icons/si";
import { FaTwitter, FaYoutube, FaFacebook, FaLinkedin, FaInstagram, FaGithub, FaLink, FaReddit, FaStackOverflow } from "react-icons/fa";
export const LinkIcon = (link: string): JSX.Element => {
    const platformMatchers: Array<[RegExp, JSX.Element]> = [
        [/github\.com/i, <FaGithub key="github" className="w-5 h-5" />],
        [/twitter\.com/i, <FaTwitter key="twitter" className="w-5 h-5" />],
        [/youtube\.com/i, <FaYoutube key="youtube" className="w-5 h-5" />],
        [/facebook\.com/i, <FaFacebook key="facebook" className="w-5 h-5" />],
        [/linkedin\.com/i, <FaLinkedin key="linkedin" className="w-5 h-5" />],
        [/instagram\.com/i, <FaInstagram key="instagram" className="w-5 h-5" />],
        [/reddit\.com/i, <FaReddit key="reddit" className="w-5 h-5" />],
        [/stackoverflow\.com/i, <FaStackOverflow key="stackoverflow" className="w-5 h-5" />],
        [/codepen\.io/i, <SiCodepen key="codepen" className="w-5 h-5" />],
        [/replit\.com/i, <SiReplit key="replit" className="w-5 h-5" />],
        [/tiktok\.com/i, <FaLink key="tiktok" className="w-5 h-5" />]
    ];

    const match = platformMatchers.find(([regex]) => regex.test(link));

    return match ? match[1] : <FaLink key="default" className="w-5 h-5" />;
};