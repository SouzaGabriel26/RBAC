import child_proccess from 'node:child_process';
import { promisify } from 'node:util';

const exec = promisify(child_proccess.exec);

async function waitForService(attempts = 0) {
	const maxAttempts = 30;
	if (attempts === 0) {
		console.log('\n> Waiting for services to be ready...');
	}

	if (attempts >= maxAttempts) {
		console.error('\n> Max attempts reached, services are not ready');
		process.exit(1);
	}

	try {
		const { stdout } = await exec('docker exec rbac-postgres pg_isready');
		if (stdout.includes('accepting connections')) {
			console.log('> Services are ready ✅\n');
			process.exit(0);
		}
	} catch {
		process.stdout.write('.');
		setTimeout(() => waitForService(attempts + 1), 500);
	}
}

waitForService();
