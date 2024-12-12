import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ExternalLink } from 'lucide-react';

export function Unisearch() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        if (!query.trim()) {
            setError('Please enter a search query');
            return;
        }

        setIsLoading(true);
        setError('');
        setResults([]);

        try {
            const response = await fetch('http://localhost:5000/google_search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: query.trim() }),
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            const data = await response.json();
            setResults(data.results);

        } catch (err) {
            console.error(err);
            setError('An error occurred while searching');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-6 max-w-7xl mx-auto">
            <div className="flex items-center mb-4">
                <h2 className="text-xl font-semibold flex-grow">Universal Search</h2>
                <Search className="h-6 w-6 text-gray-500" />
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                    placeholder="Enter your query"
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <button
                onClick={handleSearch}
                disabled={isLoading}
                className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
                {isLoading ? 'Searching...' : 'Search'}
            </button>

            {results.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-lg font-medium mb-2">Search Results</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 rounded-md overflow-hidden">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Link
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Analyze
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 text-sm">
                                {results.map((result, index) => (
                                    <tr key={index} className="hover:bg-gray-100 transition-colors duration-200">
                                        <td className="px-6 py-2 whitespace-normal break-words font-mono">
                                            <a
                                                href={result}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 hover:underline flex items-center"
                                            >
                                                {result}
                                                <ExternalLink className="ml-2 h-4 w-4 text-gray-400 hover:text-gray-600" />
                                            </a>
                                        </td>
                                        <td className="px-6 py-2 whitespace-nowrap">
                                            <Link to="/twitter" state={{ username: result }}>
                                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs">
                                                    Analyze
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}