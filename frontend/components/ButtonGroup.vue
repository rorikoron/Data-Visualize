<script setup>


const props = defineProps({
    buttons: Array,
})

</script>

<template>
    <div class="flex flex-row bg-slate-100">
        <div class="flex flex-col rounded-sm py-16 text-zinc-800 font-bold tracking-wider justify-between" style="background-color: rgba(250, 250, 250, 0.2);">
            <div class="flex flex-col">
                <button v-for="button in buttons" 
                        :key="button.value" 
                        @click="button.onClick"
                        :class="[
                            'w-56', 'text-xl', 'pr-6', 'pl-2', 'py-3', 'rounded-sm', 'flex', 'items-center', 'transition-all', 'hover:bg-slate-300',
                        ]">
                    <UIcon :name="button.icon" class="px-7 text-xl" />
                    {{ button.value }}
                </button>
            </div>
        </div>
    </div>
</template>