import { set, get } from 'idb-keyval';

export const testIDBKeyVal = async () => {
	await set('hello', 'world');
	const whatDoWeHave = await get('hello');
	console.log(`When we queried idb-keyval for 'hello', we found: ${whatDoWeHave}`);
};
