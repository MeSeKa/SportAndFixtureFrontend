export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">Welcome to the Sport and Fixture Management Application</h1>
      <p className="text-lg text-gray-700 mb-8">
        The <strong>Sport and Fixture Management Application</strong> is a comprehensive solution designed to manage sports teams, players, and fixtures efficiently. This application provides an intuitive interface for users to perform various operations, including adding new teams, managing players, scheduling fixtures, and tracking match results.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-green-600">Key Features</h2>
      <ul className="list-disc list-inside mb-8 text-gray-700">
        <li className="mb-2"><strong>Manage Teams:</strong> View, add, edit, and delete teams. Each team includes details such as team name and city.</li>
        <li className="mb-2"><strong>Player Management:</strong> Easily manage players associated with different teams. Search and filter players by name. Add, edit, or remove players from the system.</li>
        <li className="mb-2"><strong>Fixture Scheduling and Results:</strong> Schedule matches between teams. Record match results, including scores. Track match status (e.g., "Not Played", "Draw", "Finished").</li>
        <li className="mb-2"><strong>Dynamic Statistics:</strong> View detailed statistics for each team, including total matches, wins, losses, draws, and not-played fixtures.</li>
        <li className="mb-2"><strong>User-Friendly Interface:</strong> Clean and responsive design for an optimal user experience. Color-coded status indicators for better visualization.</li>
        <li><strong>Real-Time Status Messages:</strong> Get instant feedback on operations (e.g., "Saved", "Error", "Deleted") with automatic message dismissal.</li>
      </ul>

      <img src="/screenshots/Teams.png" alt="Teams Page Screenshot" className="w-full rounded-lg mb-8" />

      <h2 className="text-2xl font-semibold mb-4 text-green-600">Technology Stack</h2>
      <ul className="list-disc list-inside mb-8 text-gray-700">
        <li className="mb-2"><strong>Frontend:</strong> Built using <strong>React</strong> and <strong>Next.js</strong>.</li>
        <li className="mb-2"><strong>Backend:</strong> Powered by <strong>ASP.NET Core Web API</strong>.</li>
        <li className="mb-2"><strong>Database:</strong> Data stored and managed using <strong>SQL Server</strong>.</li>
        <li><strong>State Management:</strong> Centralized state management using <strong>Redux</strong>.</li>
      </ul>

      <img src="/screenshots/TeamDetails.png" alt="Team Details Page Screenshot" className="w-full rounded-lg mb-8" />

      <h2 className="text-2xl font-semibold mb-4 text-green-600">Getting Started</h2>
      <p className="text-lg text-gray-700 mb-4">Use the navigation menu to explore the application:</p>
      <ul className="list-disc list-inside mb-8 text-gray-700">
        <li className="mb-2"><strong>Teams:</strong> Manage all registered teams.</li>
        <li className="mb-2"><strong>Players:</strong> View and manage players associated with teams.</li>
        <li><strong>Fixtures:</strong> Schedule fixtures and track match results.</li>
      </ul>

      <img src="/screenshots/Fixtures.png" alt="Fixtures Page Screenshot" className="w-full rounded-lg mb-8" />

      <p className="text-lg text-gray-700">Enjoy managing your sports data effortlessly!</p>
    </div>
  );
}
