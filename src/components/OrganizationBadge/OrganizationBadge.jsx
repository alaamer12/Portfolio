import {motion} from 'framer-motion';
import {getOrganizationConfig} from '../../data/projects';

const OrganizationBadge = ({organizationId, className = ''}) => {
    if (!organizationId) return null;

    const org = getOrganizationConfig(organizationId);
    if (!org) return null;

    // Organization-specific base colors (no hover variants)
    const getOrgStyles = (orgId) => {
        const styles = {
            t2f_labs: 'bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500',
            json_alchemy: 'bg-gradient-to-r from-emerald-500 to-teal-600 dark:from-emerald-400 dark:to-teal-500',
            truefam: 'bg-gradient-to-r from-red-500 to-rose-600 dark:from-red-400 dark:to-rose-500',
            symphony_ai: 'bg-gradient-to-r from-violet-500 to-purple-600 dark:from-violet-400 dark:to-purple-500'
        };
        return styles[orgId] || styles.t2f_labs;
    };

    const orgBgClass = getOrgStyles(org.id);

    return (
        <motion.a
            href={org.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white transition-all duration-300 ${orgBgClass} hover:brightness-110 hover:shadow-lg backdrop-blur-sm border border-white/20 ${className}`}
            title={`Visit ${org.displayName} on GitHub`}
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
            initial={{opacity: 0, scale: 0.8}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.2}}
        >
            {/* GitHub Icon */}
            <svg
                className="w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clipRule="evenodd"/>
            </svg>

            {/* Organization Name */}
            <span className="tracking-wide">
                {org.displayName}
            </span>

            {/* External Link Icon */}
            <svg
                className="w-2.5 h-2.5 opacity-75"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
        </motion.a>
    );
};

export default OrganizationBadge;