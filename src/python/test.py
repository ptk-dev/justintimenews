# import time
# from transformers import BartTokenizer, BartForConditionalGeneration
# import torch

# init_time_start = time.time()
# # Load the model and tokenizer
# summarizer_model_name = "facebook/bart-large-cnn"
# summarizer_tokenizer = BartTokenizer.from_pretrained(summarizer_model_name)
# summarizer_model = BartForConditionalGeneration.from_pretrained(summarizer_model_name)
# init_time_end = time.time()
# print("Initialized in", init_time_end-init_time_start)

# device = torch.device("vulkan")
# print("Using device:", device)

# print(torch.is_vulkan_available())


# summarizer_model = summarizer_model.to(device) # type: ignore

# def summarize(article):
#     # Tokenize the article
#     inputs = summarizer_tokenizer(article, return_tensors="pt",
#                        truncation=True, max_length=1024)

#     # Generate a summary
#     summary_ids = summarizer_model.generate(
#         inputs["input_ids"],
#         max_length=80,
#         min_length=60,
#         num_beams=2,
#         no_repeat_ngram_size=2,
#         early_stopping=False
#     )

#     # Decode the summary
#     summary = summarizer_tokenizer.batch_decode(summary_ids, skip_special_tokens=True)[0]
#     return summary

# print("\n")

# generatation_time_start = time.time()
# article = "On a recent Sunday afternoon, the women committee of Badulipara, a village of ninety-three Bodo families in western Assam’s Chirang district, convened to elect its new office bearers (and eat a fish-and-rice lunch). The venue was a football field on the edge of which stood a “library” with no books.This reporter from Guwahati was offered a chair, but questions about the imminent elections were not met with much enthusiasm. “Are you from the BJP?” one woman asked, referring to the Bharatiya Janata Party. “There is no BJP here, there are only Bodo people in our village.”The youngest in the group, 23-year-old Dorely Bodo, stepped in to explain: “He wants to know about our problems.”Then, the floodgates opened.‘We are all UPPL’“First, see the library,” said a middle-aged woman who would not reveal her name. “It’s falling apart so bad that we can’t even sit inside.”Another woman stretched her hands as wide as she could to show what she said was the size of the potholes in the road leading to the village. “If someone is dying, we have to carry them on our shoulders till the main road because the ambulance can’t reach the village,” she said. “Other people may have got a lot of things, but we have not.”There was unanimous consensus: “Poriborton” (change) was needed for “development”.“We are all UPPL this time,” declared Dorely Boro, referring to the United People’s Party Liberal, a regional political party whose area of operation is limited largely to the four districts that make up the autonomous Bodoland Territorial Region in western Assam. The UPPL is in an alliance with the BJP. In the 2016 Assembly elections, however, the BJP had partnered with the Bodo People’s Front,  then the ruling party of the Bodoland Territorial Council. The council had been formed in 2003 after the Bodo Liberation Tigers, an armed insurgent group fighting for a separate Bodo state, had signed a peace accord with the Indian government, which carved out an area of autonomous governance for the Bodos under the Sixth Schedule of the Constitution. The Bodo Liberation Tigers then took the shape of Bodo People’s Front, which swept elections, taking control of the council, subsequently winning the sole Lok Sabha seat and most Assembly seats in the region.Even in 2016, in alliance with the BJP, it won all 12 assembly seats in the region. But cracks appeared in the partnership. By the time the next council polls took place in December 2020, the saffron party dumped the BPF and joined hands with UPPL, a party that came into existence in 2015. The UPPL – with the help of BJP – wrested the council, ending 17 uninterrupted years of BPF rule. Dorely Boro (in pink) thinks change is required for development. A leader who speaks for the ‘jati’A large section of the Bodos Scroll.in spoke to across the four districts that make up the autonomous region said they were putting their weight behind the UPPL this time. The reasons ranged from a desire for development to the protection of their identity. The young woman in Badulipara village, Dorely Boro, reasoned: “People are longing for change, plus their government has also come in council.”Holi Bodo, a farmer in neighbouring Baksa district’s Bhalukdonga village, said he supported the UPPL because it was helmed by a leader who did “andolan” for the “jati (community). Brahma was referring to Promod Bodo, the party’s president, formerly the head of the All Bodo Students’ Union.Holi Bodo supports the UPPL because of its leader Promod Boro. The Bodos, the largest community notified as a Scheduled Tribe in Assam, have agitated for an ethnic homeland for decades. In the 1980s, the All Bodo Students’ Union raised the slogan: “Divide Assam Fifty-Fifty”. Parallely, an armed militancy also took wings: the fighters of the National Democratic Front of Bodoland were not content with just a separate state, they wanted to secede from India. In 1992, the All Bodo Students’ Union signed an accord with the Assam government, paving the way for the creation of an autonomous council that provided for some degree of self-governance in the area staked out for Bodoland. The accord proved to be inadequate; it did nothing to stop the National Democratic Front of Bodoland which continued to target minority communities in the region. In 1996, there was a split in the militancy. A new group called the Bodo Liberation Tigers emerged. It found the demand for secession unrealistic and called for an autonomous Bodo territory within India. After years of savage internecine strife, the Bodo Liberation Tigers signed a peace agreement with the Union government in 2003. The autonomous council was upgraded to a territorial council under the Sixth Schedule of the Constitution.It proved to be an imperfect solution once again. The All Bodo Students’ Union and a few affiliate groups revived the statehood demand – and the National Democratic Front of Bodoland continued its armed militancy. In 2020, the students’ outfit and the several splinter groups of the National Democratic Front of Bodoland inked yet another peace agreement with the Centre which has described it as “final and comprehensive solution” to the Bodo demands, given that it takes on board all major stakeholders. As of now, it seems to have at least put an end to the Bodo insurgency.This has endeared Promod Bodo, who is widely seen as the architect and face of the accord, although he never picked up arms himself, to a large section of the Bodo society. “He brought the boys in the jungle back home – that is a huge thing for us,” said Argang Brahma, headmaster of a lower primary school in Chirang’s Bodo Bazar, as we sipped tea at Purnima Brahma’s nameless eatery. Purnima Brahma too would vote for UPPL. “Because under the BPF, we got nothing,” she offered by way of explanation.Purnima Brahma said she got nothing under the BPF. A numbers gameThis would suggest that the UPPL has decidedly the upper hand in the 12 Assembly constituencies that fall in the Bodoland Territorial Region.But that is not necessarily true – as even the UPPL’s leaders and cadres concede in private. The reason for this is a contradiction at the heart of the Bodoland Territorial Region: the Bodos are a minority here, less than 30%.The four districts that make up the region are home to a wide range of communities. After the Bodos, Muslims of Bengali origin are the largest group, their population around 20%, according to local estimates. There is also a large presence of Adivasi communities and people who identify themselves as Koch-Rajbonghis. A significant number of Bengali Hindus also live in the area. The backing of the Bodos alone, therefore, is not adequate to win elections in the region. The BPF is, of course, all too aware of that. “Bodo votes, some places we get 30%, others 40% or 50%, but we still win,” said Kampa Borgoyary, the party’s deputy chief. “It is always like that.”Observers agree. “The UPPL’s main base has always been the Bodos,” explained Jyotiraj Pathak, who teaches political science at the Bodoland University. Until 2015, the UPPL existed in a different avatar, as the People’s Coordination for Democratic Rights.  In Bodoland, it is often referred to as the “ABSU party”, because the top leadership of the party is populated largely by men who were once part of the All Bodo Students’ Union.While an overwhelming section of Bodos supported the UPPL, it was the BPF – or more accurately, its mercurial “chief” Hagrama Mohilary – who held sway among most of the non-Bodos. “And statistically, it is clear which group is a bigger factor,” said Pathak.‘Only one who speaks for minorities’According to Pathak, this was because Mohilary was viewed as the more moderate face of Bodo politics.Indeed, several non-tribals seemed to think of “Hagrama sir” as such. “He is the only one who speaks for minorities, not even our own leaders do that,” said Sattu Ali, a businessman in Bhabanipur in Chirang. “If UPPL comes, we will have to leave Bodoland because Promod Boro’s background is that of a student leader of one community – he will raise his voice for only that community.”In 2012, Ali had spent several months in a relief camp after Bodo rioters went on a rampage in the area. “I still remember how it began, “ said Ali, rather matter-of-factly. “Two boys on a motorbike started shooting everyone they could see. After that the mob came and burnt everything down.”In some ways, this image of Mohilary as a protector of non-Bodos in Bodoland is almost counterintuitive. Mohilary till 2003 was commander-in-chief of the Bodo Liberation Tigers, which in the late 90s unleashed several murderous attacks on the region’s non-Bodos, killing scores of people.In fact, as recently as 2012, the Bodo People’s Front was implicated in the riots that shook the region leaving hundreds dead and thousands homeless for months on end. One of its MLAs was arrested for inciting violence.What gives?Sattu Ali who was displaced during the 2012 riots thinks no one speaks for minorities as much as Mohilary.A riot forces some realignments   To understand this, one needs to trace the changing contours of politics in the region. The riots of 2012 reduced politics in the area largely to a binary of Bodo versus non-Bodo. Non-Bodo communities started banding together politically, setting aside their own histories of differences.This hurt the BPF. In 2014, it lost the region’s lone Parliamentary constituency of Kokrajhar to Naba Sarania, an independent candidate who fought the elections on the plank of security of the non-Bodos.Then, in the 2015 council elections, the party’s tally dramatically dropped to 20 from the previous 31, out of 40.Observers and residents say this led to the BPF taking a more conciliatory position. It helped that Mohilary himself never really lost his personal popularity. His public speeches, lighthearted and full of wisecracks, made him an endearing figure to even those wary of the BPF otherwise. “People like his straight-talking ways here. You could compare him to someone like Lalu Prasad Yadav,” said Pathak, referring to the former Bihar chief minister.Enter BJPBut the electoral math of the region has been somewhat complicated by the growth of the BJP, which won as many as nine seats – unprecedented for national parties.The BJP’s rise, too, has been spurred to a large extent by the region’s non-Bodo communities, the Bengali Hindus in particular.Many of them previously backed the BPF. Consider Dhruba Kundu, who owns a photo-framing shop in Kokrajhar’s Bhowraguri town. Kundu was all praise for Mohilary when we met on Holi. “Hagrama sir saw everyone as equal,” he said. “He has done good work also. He has built so many roads and bridges.”Yet, Kundu said he would vote for the UPPL this time – because it is in partnership with the BJP, a party that he believed represented Bengali Hindus like him.Dhruba Kundu likes Mohilary but thinks of the BJP as the party which represents Bengali Hindus like him.BJP as a foil to Bodo chauvinismEven the region’s Adivasis, who have been at the receiving end of violence by Bodo extremists on several occasions, seem to be quite open to the idea of the UPPL-BJP alliance, again largely because of their faith in the saffron party. This despite the BJP failing to keep its promise made in the previous elections of granting the community Scheduled Tribe status.“If BJP is in power, there is security,” said Edward Hembram, a young Santhal activist who lives in Kokrajhar’s Gossaigaon town. “Extortions, kidnapping that used to happen earlier have gone down.”Satya Nath Tudu, a school teacher and an advisor to the All Assam Adivasi Students’ Union, which has exhorted people to vote against the BJP this time, said the community will have to contend with several tough questions as they cast their votes this time.“While it is true the BJP has failed to grant us ST status, one must also understand that is because the Bodos oppose it,” he said.This opposition, Tudu explained, cut across party lines. If the BPF holds on to a sizeable chunk of the 12 seats it won last time, Tudu believed it may well be game over for the BJP in Assam. And if that were to be indeed the case, the ripples would be felt in the Bodoland Territorial Council too.“Remember that there is no anti-defection law in the council,” he pointed out. “Immediately many of them will defect to the BPF.”And a council led by the BPF – a party whose top leadership is entirely Bodo – was not in the long-term interests of the Adivasi community, Tudu claimed. “With the UPPL, there will always be BJP because they are not powerful enough by themselves,” he said. “That by itself would blunt Bodo chauvinism.”According to Edward Hembram, if the BJP is in power, there is security.The popularity of Hagrama MohilaryTudu’s view of the political landscape in the Bodoland region also informs the BJP-UPPL alliance to a large extent. The BJP has little traction among the Bodos; ditto for the UPPL with the non-Bodos. On paper, it is a perfect symbiotic arrangement to thwart the BPF.But this does not account for the region’s second largest group: the Muslims of Bengali origin who have of late become one of the most reliable support bases of the BPF. In the council elections held last year, the group is believed to have voted for the party en masse. It helps that the BPF is fighting the Assembly elections as part of the Congress-led alliance, which includes perfume baron Badruddin Ajmal’s All India United Democratic Front.In any case, many say that the BJP’s math may pale in the face of Mohilary’s popularity in the region. Even those from the opposition camp concede that they had no one to match Mohilary’s stature in Bodoland. Indeed, even those who say their lives had not substantially improved under the BPF government talk about him with a sense of adulation and reverence, choosing to blame local-level leaders instead. “Hagrama sir sends money for development, but the local BPF leaders eat up everything,” said Debesh Das, a vegetable seller in Baksa.Or as Kundu, the photo-framer who is a Bengali Hindu, said: We still have a lot of bhalobasha (love) for him.Besides, there are still Bodos who continue to be loyal to Mohilary. This was evident in the council elections of 2020. Despite a new accord which claimed to provide a “final and comprehensive solution” to the demand of the Bodos and the BJP using all its might, the BPF ended as the single largest party with 17 seats. What makes it even more remarkable is that the BPF was also battling 17 years of anti-incumbency.Hagrama Mohilary addresses a public meeting in attire associated with Bengali Muslims. Photo: FacebookThe perennial kingmakerMohilary has long been touted as the king-maker in Assam’s politics, a role many believe he may have the chance to play next month too. Despite BPF’s pre-poll alliance with the Congress, the political grapevine in Bodoland indicates that Mohilary may still be amenable to the BJP.The BPF-BJP breakup, leaders of both parties concede in private, is more of a personal fall-out between Mohilary and Himanta Biswa Sarma, arguably the BJP’s most influential politician in Assam. (Ironically, it was Sarma who brought the two parties together in 2016.)Borgoyary, Mohilary’s long-time deputy, said it was “too late” for a patch up now. “We extended our cooperation, but they said no,” he said.But those who know Mohilary intimately would perhaps disagree. As one of his aides said, “It will all depend on the numbers after the elections.”"
# print(summarize(article))
# generatation_time_end = time.time()
# print("Summarized in", generatation_time_end-generatation_time_start)




#################################################

import torch