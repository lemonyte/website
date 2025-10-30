<script lang="ts">
    import Prism from "prismjs";
    import "prismjs/components/prism-python";
    import Giscus from "@giscus/svelte";
    import Head from "$lib/components/Head.svelte";
    import Island from "$lib/components/Island.svelte";
    import Tag from "$lib/components/Tag.svelte";

    const codePreamble = `code = compile("print(...)", "<flag>", "exec")`;

    const { data } = $props();
    const { challenge } = $derived(data);

    let solution = $state("");
    let resultStatus: boolean | undefined = $state(undefined);
    let resultText = $state("Click Submit to check your solution.");
    let isSubmitting = $state(false);

    const submit = async () => {
        try {
            if (!solution.trim()) {
                resultStatus = false;
                resultText = "There's no code to submit yet!";
                return;
            }

            isSubmitting = true;
            try {
                const response = await fetch("https://exec-ctf.func.lemonyte.com/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ code: solution }),
                });
                resultStatus = response.status === 200;
                if (response.status === 200) {
                    resultText = "Success! You solved it 🎉";
                } else if (response.status === 406) {
                    resultText = "Your solution didn't work. Try again? 🤔";
                } else {
                    throw new Error(`${response.status} ${await response.text()}`);
                }
            } catch (error) {
                resultStatus = false;
                resultText = `Something went wrong 😓 (it probably wasn't your fault)\n${error}`;
            }
        } finally {
            isSubmitting = false;
        }
    };
</script>

<Head title={challenge.title} description={challenge.description}></Head>

<div class="flex flex-col gap-8">
    <Island>
        <div class="flex flex-col">
            <div class="flex flex-col gap-2">
                <h1 class="text-4xl font-semibold">{challenge.title}</h1>
                <div class="text-neutral-500 dark:text-neutral-400 prose prose-neutral dark:prose-invert">
                    <span>Created by <a href="https://elliott.diy">Elliott</a> and <a href="/">Lemonyte</a></span>
                </div>

                <div class="flex flex-row gap-2">
                    <Tag>{challenge.language}</Tag>
                    <Tag>{challenge.difficulty}</Tag>
                </div>
            </div>
            <div class="mt-8 prose prose-neutral dark:prose-invert">
                <p>
                    Welcome to the Exec CTF challenge! Can you break out of a custom-built Python jail and successfully
                    use <code>exec()</code>?
                </p>
                <p>
                    The flag is hidden in a <code>print</code> statement inside a compiled code object. This is
                    provided to you in a variable named <code>code</code>
                </p>
                <p>Your task is to execute it so that it prints the flag.</p>
                <p>
                    However, built-in execution functions like <code>exec</code> and <code>eval</code> are blocked by a
                    custom security mechanism. The challenge is to bypass these restrictions and successfully run the code
                    object.
                </p>
                <p>
                    To pass the challenge, the flag must be printed to <code>stdout</code>. Submit your Python code
                    below to attempt the challenge.
                </p>
                <p>
                    You can download a local testing environment
                    <a href="/assets/challenges/exec_challenge_local.zip">here</a>. Need a hand or more detailed
                    instructions? Shoot me a DM on Discord!
                </p>
                <p>
                    <i>Originally hosted on <a href="https://whcc.club">whcc.club</a></i>
                </p>

                <details>
                    <summary class="select-none font-bold">Show hint</summary>
                    <p>
                        Security controls are rarely perfect, and this one is no exception. The execution environment
                        uses a custom package,
                        <a href="https://pypi.org/project/safe-exec/" target="_blank">safe-exec</a>. Understanding its
                        behavior might help you find a way to run the <code>code</code> object.
                    </p>
                    <p>
                        Also, keep in mind that compiled code objects can contain nested <code>exec</code> <i>and</i>
                        <code>eval</code> calls.
                    </p>
                </details>
            </div>
        </div>
    </Island>

    <Island>
        <div class="flex flex-col gap-4">
            <h2 class="text-2xl mb-4">Try your code</h2>
            <div class="flex flex-col items-stretch">
                <pre class="whitespace-normal">
                    <code class="block p-2 select-none border border-sky-500 border-b-0 rounded-t-lg">
                        {@html Prism.highlight(codePreamble, Prism.languages.javascript, "javascript")}
                    </code>
                </pre>

                <textarea
                    bind:value={solution}
                    rows="10"
                    placeholder="exec(code)"
                    spellcheck="false"
                    autocapitalize="off"
                    class={[
                        "p-2 border font-mono border-sky-500 border-t-0 rounded-b-lg",
                        "focus-visible:outline-none resize-y whitespace-pre overflow-auto",
                    ]}
                >
                </textarea>
            </div>

            <button
                onclick={submit}
                class={[
                    "text-xl font-semibold whitespace-nowrap p-2 rounded-lg transition",
                    "bg-neutral-300/40 dark:bg-neutral-700/40 hover:bg-neutral-300/80 dark:hover:bg-neutral-700/80",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                ]}
                disabled={isSubmitting}
            >
                Submit
            </button>
            <div
                class={[
                    "text-center p-4 rounded-lg",
                    resultStatus === true && "bg-green-400/30",
                    resultStatus === false && "bg-red-400/30",
                ]}
            >
                <p class="whitespace-pre-line">{resultText}</p>
            </div>
        </div>
    </Island>

    <Island>
        <Giscus
            id="comments"
            repo="lemonyte/website"
            repoId="R_kgDOKC4xmg"
            category="Giscus comments"
            categoryId="DIC_kwDOKC4xms4CqA6y"
            mapping="pathname"
            term=""
            strict="1"
            reactionsEnabled="1"
            inputPosition="top"
            theme="transparent_dark"
            lang="en"
            loading="lazy"
        />
    </Island>
</div>
